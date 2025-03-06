import { useState, useEffect } from 'react'
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";


// import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTodo) {
      console.log("editTodo1:::",editTodo);
      await updateTodo(editTodo._id, { title, completed: editTodo.completed });
      setEditTodo(null);
    } else {
      await addTodo({ title, completed: false });
    }
    setTitle("");
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditTodo(todo);
    console.log("editTodo2:::",editTodo);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    console.log("Todo1:::",todo);
    await updateTodo(todo._id, { title: todo.title, completed: !todo.completed });
    fetchTodos();
  }


  return (
    <>
       <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className='text-4xl font-extrabold mb-6 text-black'>Todo List</h1>
        <form onSubmit={handleSubmit} className='flex gap-3 mb-6 w-full max-w-lg'>
          <input 
          className='p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-white'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo..."
            required
          />
          <button className={`text-white px-5 py-3 rounded-lg shadow-md transition font-semibold ${ editTodo ? 'bg-green-600 hover:bg-green-700': 'bg-blue-600 hover:bg-blue-700'}`} type="submit">{editTodo ? "Update" : "Add"}</button>
        </form>

      <div className='w-full max-w-lg'>
        {todos.map((todo) => (
          <div key={todo._id} className='flex justify-between items-center p-4 mb-3 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition'>
            <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo)}
        className='mr-3 w-5 h-5 accent-blue-500'
      />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.title}
            </span>
            <button onClick={() => handleEdit(todo)} className='bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition font-semibold'>Edit</button>
            <button onClick={() => handleDelete(todo._id)} className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition font-semibold'>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
