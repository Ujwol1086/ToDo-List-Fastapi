from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.todoRoute import router as todoRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todoRouter)

@app.get("/")
def root():
    return {"message":"API is running"}

