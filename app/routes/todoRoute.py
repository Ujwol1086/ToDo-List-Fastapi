from fastapi import APIRouter, HTTPException
from models.todo import ToDo
from services.todoService import get_todos, create_todo, delete_todo, update_todo


router = APIRouter()

@router.get("/todos")
def get_todo():
    return get_todos()

@router.post("/todos")
def add_todo(todo: ToDo):
    return create_todo(todo)

@router.put("/todos/{todo_id}")
def update_todo_route(todo_id: int, todo: ToDo):
    if todo_id != todo.id:
        raise HTTPException(status_code=400, detail="ID mismatch")
    updated_todo = update_todo(todo)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="ToDo not found")
    return updated_todo

@router.delete("/todos/{todo_id}")
def delete_todo_route(todo_id: int):
    success = delete_todo(todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="ToDo not found")
    return {"message": "ToDo deleted"}