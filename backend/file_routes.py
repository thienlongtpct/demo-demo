import os
import shutil

import jwt
import whisper
from auth import SECRET_KEY
from database import SessionLocal
from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile
from models import File, User
from sqlalchemy.orm import Session
from transformers import pipeline

router = APIRouter(prefix="/files")
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

summarizer = pipeline("summarization", model="VietAI/vit5-large-vietnews-summarization")
transcriber = whisper.load_model("base")  # small/medium/large depending on your machine


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


@router.post(
    "/upload",
    summary="Tải file âm thanh",
    description="""
Tải file âm thanh lên server.

- File được lưu trong thư mục `uploads/`.
- Frontend chạy **chuyển giọng nói thành văn bản (transcription)**, gửi vào field text.
- Sau đó chạy **AI summarization** để tóm tắt nội dung.
- Kết quả (transcription + summary) được lưu trong CSDL.

Trả về: ID file, nội dung text và bản tóm tắt.
""",
)
def upload_file(
    file: UploadFile, token: str, text: str = Form(None), db: Session = Depends(get_db)
):
    user = get_current_user(token, db)

    # Save file locally
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🔹 Step 1: Transcription (placeholder for Whisper or Vosk)
    # For now we just simulate transcription from filename
    # Replace this with actual transcription pipeline
    transcription_text = text

    # 🔹 Step 2: Auto-summarize
    input_text = transcription_text
    if len(input_text) > 1024:
        input_text = input_text[:1024]
    summary = summarizer(input_text, max_length=100, min_length=25, do_sample=False)[0][
        "summary_text"
    ]

    # 🔹 Save to DB
    db_file = File(
        file_name=file.filename,
        file_path=file_path,
        file_text_content=transcription_text,
        summary=summary,
        owner=user,
        text=text,
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return {
        "msg": "Tải file thành công",
        "file_id": db_file.id,
        "transcription": db_file.file_text_content,
        "summary": db_file.summary,
    }


@router.get(
    "/{file_id}",
    summary="Xem chi tiết file",
    description="""
Lấy thông tin chi tiết về một file đã upload.

Bao gồm:
- **Tên file**
- **Nội dung text (transcription)**
- **Bản tóm tắt (summary)**
- **Ghi chú người dùng**
- **Thời gian tạo**
- **Thông tin chủ sở hữu** (username, email, số điện thoại)

⚠️ Chỉ người sở hữu file mới có thể xem.
""",
)
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


@router.get(
    "/",
    summary="Danh sách file của người dùng",
    description="""
Trả về tất cả các file mà user đã upload.

Bao gồm:
- **ID file**
- **Tên file**
- **Đường dẫn file**
- **Nội dung text (transcription)**
- **Bản tóm tắt (summary)**
- **Ghi chú**
- **Thời gian tạo**
""",
)
def list_files(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    files = db.query(File).filter(File.owner_id == user.id).all()
    return files
