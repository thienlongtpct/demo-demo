import auth
import file_routes
import keyword_routes
from database import Base, SessionLocal, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import User
from passlib.hash import bcrypt

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Speech-to-Text Backend")

# ==========================
# CORS CONFIG
# ==========================
origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",  # Another dev URL
    "https://your-frontend.com",  # Production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# ==========================
# Create default admin
# ==========================
def create_default_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            new_admin = User(
                username="admin",
                password_hash=bcrypt.hash("mT@2025"),
                email="admin@example.com",
                phone_number=None,
                role="admin",
            )
            db.add(new_admin)
            db.commit()
            print("Default admin user created.")
        else:
            print("Admin user already exists")
    finally:
        db.close()


create_default_admin()

# ==========================
# Routes
# ==========================
app.include_router(auth.router)
app.include_router(file_routes.router)
app.include_router(keyword_routes.router)
