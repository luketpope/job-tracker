from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
# import openai
# openai.api_key = "api-key-1976"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobCreate(BaseModel):
    title: str
    company: str
    salary: int
    link: str
    status: str
    date_applied: str

class Job(JobCreate):
    id: int

jobs_db: List[Job] = []

@app.get("/")
def read_root():
    return {"message": jobs_db}

@app.get("/jobs", response_model=List[Job])
def get_jobs():
    return jobs_db

@app.post("/jobs", response_model=Job)
def create_job(job_data: JobCreate):

    if any(j.id == id for j in jobs_db):
        raise HTTPException(status_code=400, detail="Job with this ID already exists.")
    
    # job = Job(
    #     title=title,
    #     company=company,
    #     salary=salary,
    #     link=link,
    #     status=status,
    #     date_applied=date_applied
    # )
    
    next_id = max([j.id for j in jobs_db], default=0) + 1
    new_job = Job(id=next_id, **job_data.dict())

    jobs_db.append(new_job)
    return new_job

@app.put("/jobs/{id}", response_model=Job)
def update_job(id: int, updated_job: Job):
    for i, job in enumerate(jobs_db):
        if job.id == id:
            jobs_db[i] = updated_job
            return updated_job
    raise HTTPException(status_code=404, detail="Job not found.")

@app.delete("/jobs/{id}")
def delete_job(id: int):
    for i, job in enumerate(jobs_db):
        if job.id == id:
            del jobs_db[i]
            return {"message": f"Job with ID {id} deleted."}
    raise HTTPException(status_code=404, detail="Job not found.")