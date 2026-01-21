import { useEffect, useState } from 'react'
import { createToDo, deleteToDo, getToDos, updateToDo } from './api/todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getToDos();
        setTodos(data);
      } catch (err) {
        setError("Failed to load todos. Make sure the backend is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [])

  const addTodos = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodos(e);
    }
  };

  const removeTodo = async (id) => {
    setError("");
    setLoading(true);
    try {
      await deleteToDo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompletion = async (id) => {
    setError("");
    setLoading(true);
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      try {
        const savedTodo = await updateToDo(updatedTodo);
        setTodos(todos.map(todo => todo.id === id ? savedTodo : todo));
      } catch (err) {
        setError("Failed to update todo. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        title: editTitle.trim(),
        description: editDescription.trim() || ""
      };
      try {
        const savedTodo = await updateToDo(updatedTodo);
        setTodos(todos.map(todo => todo.id === id ? savedTodo : todo));
        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
      } catch (err) {
        setError("Failed to update todo. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
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
            <form onSubmit={addTodos} className='inline-block'>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Task Title' 
                className='border rounded px-2 py-1'
                disabled={loading}
                required
              /> 
              <input 
                type="text" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Description (optional)' 
                className='border rounded px-2 py-1 ml-2'
                disabled={loading}
              /> 
              <button 
                type="submit"
                disabled={loading || !title.trim()}
                className='bg-blue-500 text-white px-2 py-1 ml-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {loading ? 'Adding...' : 'Add ToDo'}
              </button>
            </form>
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
                      <td className='p-2'>
                        {editingId === todo.id ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className='border rounded px-2 py-1 w-full'
                            disabled={loading}
                            required
                          />
                        ) : (
                          todo.title
                        )}
                      </td>
                      <td className='p-2'>
                        {editingId === todo.id ? (
                          <input
                            type="text"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            className='border rounded px-2 py-1 w-full'
                            disabled={loading}
                          />
                        ) : (
                          todo.description || '-'
                        )}
                      </td>
                      <td className='p-2'>{todo.completed ? 'Completed' : 'Pending'}</td>
                      <td className='p-2'>
                        {editingId === todo.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(todo.id)}
                              disabled={loading || !editTitle.trim()}
                              className='bg-blue-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                              {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={loading}
                              className='bg-gray-500 text-white px-2 py-1 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(todo)}
                              disabled={loading || editingId !== null}
                              className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => toggleCompletion(todo.id)} 
                              disabled={loading || editingId !== null}
                              className='bg-green-500 text-white px-2 py-1 rounded mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                              {todo.completed ? 'Mark Pending' : 'Mark Completed'}
                            </button>
                            <button 
                              onClick={() => removeTodo(todo.id)} 
                              disabled={loading || editingId !== null}
                              className='bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                              Delete
                            </button>
                          </>
                        )}
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
