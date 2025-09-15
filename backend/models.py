from database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    phone_number = Column(String, nullable=True)
    role = Column(String, default="user")  # 🔹 "admin" or "user"

    files = relationship("File", back_populates="owner")
    keywords = relationship("Keyword", back_populates="owner")


class File(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_text_content = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="files")


class Keyword(Base):
    __tablename__ = "keywords"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, nullable=False)
    type = Column(String, nullable=False)  # "admin" or "custom"
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # null for admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="keywords")
    owner = relationship("User", back_populates="keywords")
