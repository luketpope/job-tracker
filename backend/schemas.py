from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    username: str

class PassUpdate(BaseModel):
    old_password: str
    new_password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True