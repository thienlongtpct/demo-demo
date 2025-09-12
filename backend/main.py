from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import auth
import file_routes
from database import Base, engine

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
# Routes
# ==========================
app.include_router(auth.router)
app.include_router(file_routes.router)
