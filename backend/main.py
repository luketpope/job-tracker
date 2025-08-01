from fastapi import FastAPI, HTTPException, Depends, Response, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
# JobModel is used to input information to database
from models import Base, Job as JobModel
from database import engine, SessionLocal
from datetime import date
from sqlalchemy.orm import Session
# import openai
# openai.api_key = "api-key-1976"

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173",
    # you can add more allowed origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

jobs_db: List[Job] = []

@app.get("/")
def read_root():
    return {"message": jobs_db}

@app.get("/jobs")
def get_jobs(
    status: str = Query(None),
    company: str = Query(None),
    db: Session = Depends(get_db)
    ):

    query = db.query(JobModel)

    if status:
        query = query.filter(JobModel.status == status)

    if company:
        query = query.filter(JobModel.company.ilike(f"%{company}%"))
    
    
    return query.all()

@app.get("/jobs/{job_id}", response_model=Job)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.post("/jobs", response_model=Job)
def create_job(job: JobCreate, db: Session = Depends(get_db)):

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
    
    job_db = JobModel(**job.dict())
    db.add(job_db)
    db.commit()
    db.refresh(job_db)

    return job_db

@app.put("/jobs/{job_id}", response_model=Job)
def update_job(job_id: int, updated_job: Job, db: Session = Depends(get_db)):
    # for i, job in enumerate(jobs_db):
    #     if job.id == id:
    #         jobs_db[i] = updated_job
    #         return updated_job
    # raise HTTPException(status_code=404, detail="Job not found.")
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    for key, value in updated_job.__dict__.items():
        if key != "_sa_instance_state":
            setattr(job, key, value)
    
    db.commit()
    db.refresh(job)
    return job

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
#     for i, job in enumerate(jobs_db):
#         if job.id == id:
#             del jobs_db[i]
#             return {"message": f"Job with ID {id} deleted."}
#     raise HTTPException(status_code=404, detail="Job not found.")
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job)
    db.commit()
    return Response(status_code=204)