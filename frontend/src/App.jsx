import { useEffect, useState } from 'react'
import { createToDo, deleteToDo, getToDos } from './api/todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getToDos();
        setTodos(data);
      } catch (err) {
        setError("Failed to load todos. Make sure the backend is running.");
        console.error(err);
      }
    };
    fetchTodos();
  }, [])

  const addTodos = async (e) => {
    if (!title.trim()) return;
    setError("");

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim() || "",
      completed: false
    };

    try {
      const savedTodo = await createToDo(newTodo);
      setTodos([...todos, savedTodo]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to create todo. Please try again.");
      console.error(err);
    }
  };

  const removeTodo = async (id) => {
    setError("");
    try {
      await deleteToDo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  const toggleCompletion = async (id) => {
    setError("");
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.completed = !updatedTodo.completed; // Toggle completion status
      try {
        await updateToDo(updatedTodo); // Ensure you have an API call to update the todo
        setTodos([...todos]); // Update the state
      } catch (err) {
        setError("Failed to update todo. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className='text-center p-4 font-bold'>ToDo App</h1>
        {error && (
          <div className='text-center mb-4 p-2 bg-red-100 text-red-700 rounded'>
            {error}
          </div>
        )}
        <div>
          <div className='text-center mb-20'>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}  
              placeholder='Task Title' 
              className='border rounded px-2 py-1'
            /> 
            <input 
              type="text" 
              value={description} 
              onChange={e => setDescription(e.target.value)}  
              placeholder='Description (optional)' 
              className='border rounded px-2 py-1 ml-2'
            /> 
            <button onClick={addTodos} className='bg-blue-500 text-white px-2 py-1 ml-2 rounded'>Add ToDo</button>
          </div>
          <div>
            <table className='table-auto w-[80%] p-2 mx-auto'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='p-2'>Task</th>
                  <th className='p-2'>Description</th>
                  <th className='p-2'>Status</th>
                  <th className='p-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan="4" className='p-4 text-gray-500'>No todos yet. Add one above!</td>
                  </tr>
                ) : (
                  todos.map(todo => (
                    <tr key={todo.id} className='border-b'>
                      <td className='p-2'>{todo.title}</td>
                      <td className='p-2'>{todo.description || '-'}</td>
                      <td className='p-2'>{todo.completed ? 'Completed' : 'Pending'}</td>
                      <td className='p-2'>
                        <button onClick={() => toggleCompletion(todo.id)} className='bg-green-500 text-white px-2 py-1 rounded mr-2'> {todo.completed ? 'Mark Pending' : 'Mark Completed'} </button>
                        <button onClick={() => removeTodo(todo.id)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
