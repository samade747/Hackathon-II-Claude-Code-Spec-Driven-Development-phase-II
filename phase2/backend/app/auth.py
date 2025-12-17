import os
from datetime import datetime
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import select, Session as DBSession

from app.db import get_session
from app.models import Session

# Removed BETTER_AUTH_SECRET check as we now use DB verification
security = HTTPBearer()


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: DBSession = Depends(get_session),
) -> str:
    token = credentials.credentials
    
    # 1. Query the session table for this token
    statement = select(Session).where(Session.token == token)
    session_record = db.exec(statement).first()

    if not session_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 2. Check for expiration
    if session_record.expiresAt < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Return the attached userId
    return session_record.userId


def verify_user_access(user_id: str, path_user_id: str) -> None:
    if user_id != path_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this resource",
        )
