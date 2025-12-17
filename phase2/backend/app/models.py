from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, nullable=False)
    title: str = Field(max_length=200, nullable=False)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: str = Field(default="open", index=True)
    priority: Optional[str] = Field(default=None, index=True)
    tags: Optional[str] = Field(default=None)
    due_date: Optional[datetime] = None
    is_recurring: bool = Field(default=False)
    recurrence_rule: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Session(SQLModel, table=True):
    __tablename__ = "session"

    id: str = Field(primary_key=True)
    token: str = Field(unique=True, index=True)
    userId: str = Field(index=True)
    expiresAt: datetime
    ipAddress: Optional[str] = None
    userAgent: Optional[str] = None
