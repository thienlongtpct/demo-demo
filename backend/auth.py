import datetime
import re

import jwt
from database import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from models import User
from passlib.hash import bcrypt
from sqlalchemy.orm import Session

SECRET_KEY = "mta-whisper"
router = APIRouter(prefix="/auth")

# ==========================
# Helpers
# ==========================


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_token(user_id: int):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


# ==========================
# Validation
# ==========================


def validate_username(username: str):
    if not re.match(r"^[a-zA-Z0-9_.-]{3,20}$", username):
        raise HTTPException(
            400,
            "Tên đăng nhập phải dài từ 3–20 ký tự, chỉ gồm chữ cái, số, dấu chấm, gạch dưới, gạch ngang",
        )


def validate_email(email: str):
    if email and not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
        raise HTTPException(400, "Email không hợp lệ")


def validate_password(password: str):
    if (
        len(password) < 8
        or not re.search(r"[A-Za-z]", password)
        or not re.search(r"\d", password)
    ):
        raise HTTPException(400, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số")


def validate_phone(phone: str):
    if phone and not re.match(r"^\+?[0-9]{7,15}$", phone):
        raise HTTPException(
            400, "Số điện thoại phải gồm 7–15 chữ số, có thể có dấu + ở đầu"
        )


# ==========================
# Routes
# ==========================


@router.post(
    "/register",
    summary="Đăng ký tài khoản mới",
    description="""
Tạo một tài khoản người dùng mới.

Yêu cầu:
- **username**: 3–20 ký tự, chỉ cho phép chữ cái, số, dấu `.` `_` `-`.
- **password**: ít nhất 8 ký tự, bao gồm cả chữ và số.
- **email**: định dạng hợp lệ, duy nhất.
- **phone_number**: 7–15 chữ số, có thể có dấu +.

Người dùng mới mặc định có vai trò **normal user**. 
""",
)
def register(
    username: str,
    password: str,
    email: str = None,
    phone_number: str = None,
    db: Session = Depends(get_db),
):
    # Kiểm tra hợp lệ
    validate_username(username)
    validate_email(email)
    validate_password(password)
    validate_phone(phone_number)

    # Kiểm tra trùng lặp
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(400, "Tên đăng nhập đã tồn tại")
    if email and db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email đã tồn tại")
    if (
        phone_number
        and db.query(User).filter(User.phone_number == phone_number).first()
    ):
        raise HTTPException(400, "Số điện thoại đã tồn tại")

    # Tạo user
    user = User(
        username=username,
        password_hash=bcrypt.hash(password),
        email=email,
        phone_number=phone_number,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "Đăng ký tài khoản thành công"}


@router.post(
    "/login",
    summary="Đăng nhập hệ thống",
    description="""
Đăng nhập bằng **username hoặc email** cùng với mật khẩu.

Trả về JWT token dùng để xác thực ở các API khác.
""",
)
def login(identifier: str, password: str, db: Session = Depends(get_db)):
    """
    identifier = username hoặc email
    """
    user = (
        db.query(User)
        .filter((User.username == identifier) | (User.email == identifier))
        .first()
    )

    if not user or not bcrypt.verify(password, user.password_hash):
        raise HTTPException(401, "Thông tin đăng nhập không hợp lệ")

    token = create_token(user.id)
    return {"access_token": token, "msg": "Đăng nhập thành công"}
