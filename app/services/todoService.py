from models.todo import ToDo

todos: list[ToDo] = []

def get_todos():
    return todos

def create_todo(todo: ToDo):
    todos.append(todo)
    return todo

def delete_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todos.remove(todo)
            return {"message": "ToDo deleted"}
    return {"message": "ToDo not found"}