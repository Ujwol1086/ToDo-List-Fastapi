import { useEffect, useState } from 'react'
import { createToDo, deleteToDo, getToDos } from './api/todo';

function App() {
   const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getToDos().then(setTodos)
  }, [])

  const addTodos = async (e) => {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };

    const savedTodo = await createToDo(newTodo);
    setTodos([...todos, savedTodo]);
    setTitle("");
  };

  const removeTodo = async(id) =>{
    await deleteToDo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };



  return (
    <>
      <div>
        <h1 className='text-center p-4 font-bold'>ToDo App</h1>
        <div>
          <div className='text-center mb-20'>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}  placeholder='Tasks' className='border rounded px-2'/> 

            <button onClick={addTodos} className='bg-blue-500 text-white px-2 py-1 ml-2 rounded'>Add ToDo</button>
          </div>
          <div>
            <table className='table-auto w-[80%] p-2 mx-auto'>
              <thead className='bg-gray-200'>
                <tr>
                  <th>Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                <tr>
                  <td>Sample Task</td>  
                  <td>
                    <button className='bg-blue-500 text-white px-2 py-1 mr-2 rounded'>Edit</button>
                    <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                  </td>
                </tr>
              </tbody>
              {todos.map(todo => (
                <tr key={todo.id} className='border-b'>
                  <td className='p-2 text-center'>{todo.title}</td>
                  <td className='p-2 text-center'>
                    <button onClick={() => removeTodo(todo.id)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
