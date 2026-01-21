from pydantic import BaseModel

class ToDo(BaseModel):
    id: int
    title: str
    description: str
    completed: bool=False