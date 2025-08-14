from fastapi import FastAPI, HTTPException, Depends, Response, Query, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from uuid import uuid4

from pydantic import BaseModel
from typing import List

# JobModel is used to input information to database
from datetime import date
from sqlalchemy.orm import Session

from models import Base, Job as JobModel, User
from database import engine, SessionLocal
from schemas import UserCreate, UserUpdate, PassUpdate
from auth import hash_password, verify_password
from config import create_access_token, SECRET_KEY, ALGORITHM
from jose import JWTError, jwt
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
    # Change to frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Class to handle user input from frontend
class JobCreate(BaseModel):
    title: str
    company: str
    salary: float
    link: str
    status: str
    date_applied: date

class Job(JobCreate):
    id: int

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Max file size for image uploads
MAX_FILE_SIZE = 2 * 1024 * 1024 # 2 MB

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    new_user = User(username=user.username, hashed_password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User created"}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401)
    except JWTError:
        raise HTTPException(status_code=401)
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=404)
    return user

@app.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.put("/me/change-username")
def change_username(data: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    current_user.username = data.username
    db.commit()
    db.refresh(current_user)
    return {"msg": "Profile updated"}

@app.put("/me/change-password")
def change_password(data: PassUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not verify_password(data.old_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Old password incorrect")
    current_user.hashed_password = hash_password(data.new_password)
    db.commit()
    return {"msg": "Password changed successfully"}

@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"message": db.query(User).all()}

@app.get("/jobs")
def get_jobs(status: str = Query(None), company: str = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    query = db.query(JobModel).filter(JobModel.owner_id == current_user.id)
    if status:
        query = query.filter(JobModel.status == status)
    if company:
        query = query.filter(JobModel.company.ilike(f"%{company}%"))
    return query.all()

@app.get("/jobs/{job_id}", response_model=Job)
def get_job(job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    jobs = db.query(JobModel).filter(JobModel.owner_id == current_user.id)
    job = jobs.filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.post("/jobs", response_model=Job)
def create_job(job: JobCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    # if any(j.id == id for j in jobs_db):
    #     raise HTTPException(status_code=400, detail="Job with this ID already exists.")
    
    # job = Job(
    #     title=title,
    #     company=company,
    #     salary=salary,
    #     link=link,
    #     status=status,
    #     date_applied=date_applied
    # )
    
    # next_id = max([j.id for j in jobs_db], default=0) + 1
    # new_job = Job(id=next_id, **job_data.dict())

    # jobs_db.append(new_job)
    
    job_db = JobModel(**job.dict(), owner_id=current_user.id)
    db.add(job_db)
    
    xp_gain = calculate_xp_for_status(job.status)
    current_user.xp += xp_gain

    db.commit()
    db.refresh(job_db)

    return job_db

@app.put("/jobs/{job_id}", response_model=Job)
def update_job(job_id: int, updated_job: Job, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # for i, job in enumerate(jobs_db):
    #     if job.id == id:
    #         jobs_db[i] = updated_job
    #         return updated_job
    # raise HTTPException(status_code=404, detail="Job not found.")
    jobs = db.query(JobModel).filter(JobModel.owner_id == current_user.id)
    job = jobs.filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    old_xp = calculate_xp_for_status(job.status)
    new_xp = calculate_xp_for_status(updated_job.status)
    xp_gain = new_xp - old_xp
    current_user.xp += xp_gain
    
    for key, value in updated_job.__dict__.items():
        if key != "_sa_instance_state":
            setattr(job, key, value)
    
    db.commit()
    db.refresh(job)
    return job

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     for i, job in enumerate(jobs_db):
#         if job.id == id:
#             del jobs_db[i]
#             return {"message": f"Job with ID {id} deleted."}
#     raise HTTPException(status_code=404, detail="Job not found.")
    jobs = db.query(JobModel).filter(JobModel.owner_id == current_user.id)
    job = jobs.filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    xp_loss = calculate_xp_for_status(job.status)
    current_user.xp -= xp_loss
    
    db.delete(job)
    db.commit()
    return Response(status_code=204)

def calculate_xp_for_status(status: str) -> int:
    return {
        "Pending": 10,
        "Interview": 25,
        "Offer": 50,
        "Rejected": 0
    }.get(status, 0)

@app.get("/me/xp")
def get_user_xp(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return {"xp": current_user.xp}

async def validate_file_size(file: UploadFile):
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    await file.seek(0)  # Reset file pointer for later use
    return file

@app.post("/me/profile-picture")
async def upload_profile_picture(file: UploadFile = Depends(validate_file_size), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    filename = f"{uuid4().hex}_{os.path.splitext(file.filename)[1]}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    current_user.profile_picture = filename
    db.commit()

    return {"message": "Uploaded successfully", "url": f"/profile-pictures/{filename}"}

@app.get("/profile-pictures/{filename}")
def get_profile_picture(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")
