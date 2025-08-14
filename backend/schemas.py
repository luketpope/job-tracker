from pydantic import BaseModel, Field, field_validator
from typing import Optional
import re

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, description="Username must be 3-20 characters")
    password: str = Field(..., min_length=8, max_length=128, description="Password must be 8-128 characters")

    @field_validator("password")
    @classmethod
    def password_complexity(cls, v: str) -> str:
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character")
        return v

class UserUpdate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, description="Username must be 3-20 characters")
    email: Optional[str] = Field(None, description="Valid email address")

class PassUpdate(BaseModel):
    old_password: str = Field(..., min_length=8, description="Old password must be at least 8 characters")
    new_password: str = Field(..., min_length=8, max_length=128, description="New password must be 8-128 characters")

    @field_validator("new_password")
    @classmethod
    def new_password_complexity(cls, v: str) -> str:
        if not re.search(r"[A-Z]", v):
            raise ValueError("New password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("New password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("New password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("New password must contain at least one special character")
        return v

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True
