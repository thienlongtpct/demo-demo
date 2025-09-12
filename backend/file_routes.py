import os
import shutil

import jwt
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from auth import SECRET_KEY
from database import SessionLocal
from models import File, User

router = APIRouter(prefix="/files")
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = db.query(User).get(payload["user_id"])
        return user
    except:
        raise HTTPException(401, "Token không hợp lệ")


from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile


@router.post("/upload")
def upload_file(
    file: UploadFile,
    token: str,
    text: str = Form(None),  # 🔹 extra text
    db: Session = Depends(get_db),
):
    user = get_current_user(token, db)
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_file = File(file_name=file.filename, file_path=file_path, owner=user, text=text)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return {"msg": "File đã upload thành công", "file_id": db_file.id}


@router.get("/{file_id}")
def get_file_detail(file_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    file = db.query(File).filter(File.id == file_id, File.owner_id == user.id).first()
    if not file:
        raise HTTPException(404, "File không tồn tại")

    return {
        "id": file.id,
        "file_name": file.file_name,
        "text": file.text,
        "file_text_content": file.file_text_content,
        "created_at": file.created_at,
        "owner": {
            "username": file.owner.username,
            "email": file.owner.email,
            "phone_number": file.owner.phone_number,
        },
    }


@router.get("/")
def list_files(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    files = db.query(File).filter(File.owner_id == user.id).all()
    return files
