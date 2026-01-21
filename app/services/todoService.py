from models.todo import ToDo

todos: list[ToDo] = []

def get_todos():
    return todos

def create_todo(todo: ToDo):
    todos.append(todo)
    return todo

def update_todo(todo: ToDo):
    for i, existing_todo in enumerate(todos):
        if existing_todo.id == todo.id:
            todos[i] = todo
            return todo
    return None

def delete_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todos.remove(todo)
            return True
    return False