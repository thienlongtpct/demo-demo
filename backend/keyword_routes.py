import jwt
from auth import SECRET_KEY
from database import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from models import Keyword, User
from sqlalchemy.orm import Session

router = APIRouter(prefix="/keywords")


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
    "/add",
    summary="Thêm từ khóa cần highlight",
    description="""
Người dùng thêm từ khóa để highlight.

- Nếu user là **admin** → từ khóa dạng *admin keyword* (áp dụng cho tất cả).
- Nếu user là **normal** → từ khóa dạng *custom keyword* (chỉ dành riêng user đó).
""",
)
def add_keyword(word: str, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    # Admin keyword
    if user.role == "admin":
        keyword = Keyword(word=word, type="admin", owner_id=None)
    else:  # User keyword
        keyword = Keyword(word=word, type="custom", owner_id=user.id)

    db.add(keyword)
    db.commit()
    db.refresh(keyword)
    return {"msg": "Thêm từ khóa thành công", "id": keyword.id}


@router.get(
    "/",
    summary="Lấy danh sách từ khóa highlight",
    description="""
Trả về danh sách từ khóa highlight bao gồm:
- **admin_keywords**: từ khóa chung do admin đặt.
- **user_keywords**: từ khóa riêng của user.
- **all_keywords**: tập hợp cả hai loại.
""",
)
def list_keywords(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    # Lấy cả keyword admin + keyword của user
    admin_keywords = db.query(Keyword).filter(Keyword.type == "admin").all()
    user_keywords = db.query(Keyword).filter(Keyword.owner_id == user.id).all()

    return {
        "admin_keywords": [k.word for k in admin_keywords],
        "user_keywords": [k.word for k in user_keywords],
        "all_keywords": [k.word for k in admin_keywords + user_keywords],
    }


@router.delete(
    "/{keyword_id}",
    summary="Xóa từ khóa",
    description="""
Xóa một từ khóa highlight.

- **Admin** có quyền xóa tất cả từ khóa (cả admin và user).
- **User** chỉ có thể xóa từ khóa do chính mình tạo.

Nếu từ khóa không tồn tại → trả về lỗi 404.
Nếu user không có quyền → trả về lỗi 403.
""",
)
def delete_keyword(keyword_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    keyword = db.query(Keyword).filter(Keyword.id == keyword_id).first()

    if not keyword:
        raise HTTPException(404, "Không tìm thấy từ khóa")

    # Quyền xóa: admin xóa tất cả, user chỉ xóa keyword của mình
    if user.role != "admin" and keyword.owner_id != user.id:
        raise HTTPException(403, "Bạn không có quyền xóa từ khóa này")

    db.delete(keyword)
    db.commit()
    return {"msg": "Xóa từ khóa thành công"}
