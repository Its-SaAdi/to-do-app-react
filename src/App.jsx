// import './App.css'
import { useState, useEffect } from "react"
import { TodoProvider } from "./contexts"
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // todo functions definitions below..
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, todo: todo} : prevTodo));
    // setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo));
  }

  const deleteTodo =  (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  const clearTodo = () => {
    localStorage.clear();
    setTodos([]);
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.completed !== true));
  }

  // Load todo(s) stored in localStorage when app is rendered.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // whenever todo(s) get changed or updated, then update new value in localStorage.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
   

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete, clearTodo}}>
      <div className="bg-gradient-to-tr from-teal-200 via-fuchsia-300 to-sky-300 min-h-screen py-8 px-4">
          <div className="w-full max-w-2xl mx-auto shadow-lg rounded-xl px-4 py-3 bg-white/15">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todo's</h1>
              <div className="mb-4">
                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3 mb-7">
                  {
                    todos.map((todo) => (
                      <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ))
                  }
              </div>
              <div className="w-full flex justify-end items-center gap-3 text-sm">
                <button className="bg-red-600 text-white hover:bg-red-500 font-semibold px-3 py-1 rounded-lg"
                  onClick={clearTodo}
                >
                  Clear All
                </button>
                <button className="bg-gray-200 text-black hover:bg-white font-semibold px-3 py-1 rounded-lg"
                  onClick={clearCompleted}
                >
                  Clear Completed
                </button>
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App