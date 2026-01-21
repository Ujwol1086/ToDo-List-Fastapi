const API_URL = "http://127.0.0.1:8000"

export const getToDos = async () => {
    const response = await fetch(`${API_URL}/todos`);
    return response.json()
}

export const createToDo = async (todo) => {
    const response = await fetch(`${API_URL}/todos`,{
        method: 'POST',
        headers:{'Content-Type':'application/json' },
        body:JSON.stringify(todo)
    });
    return response.json()
}

export const deleteToDo = async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`,{
        method: 'DELETE'
    });
    return response.json()
}