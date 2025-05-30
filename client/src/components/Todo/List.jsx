import React, { useEffect, useState, useContext } from "react";
import { getTodos, deleteTodo, updateTodo } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import TodoForm from "./Item";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const { token, logoutUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    if (!token) {
      alert("No token found");
      return;
    }
    try {
      const res = await getTodos(token);
      setTodos(res.data);
    } catch (e) {
      alert("Failed to fetch todos");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id, token);
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== id));
    } catch (e) {
      alert("Failed to delete todo");
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(todo._id, updatedTodo, token);
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? updatedTodo : t))
      );
    } catch (e) {
      alert("Failed to update todo");
    }
  };

  const handleSuccess = async () => {
    fetchTodos();
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (logoutUser) {
      logoutUser();
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Your Todos
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowForm(true);
                setEditingTodo(null); // 🆕 Reset form for new todo
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              + Add Todo
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No todos yet. Add one!
          </p>
        )}

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => toggleCompleted(todo)}
                  className="w-5 h-5 cursor-pointer"
                />
                <div>
                  <h3
                    className={`text-xl font-semibold ${todo.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "text-gray-900 dark:text-gray-100"
                      }`}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={`${todo.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "text-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {todo.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingTodo(todo);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-bold"
                  aria-label="Edit todo"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-bold"
                  aria-label="Delete todo"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative shadow-lg"
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingTodo(null);
                }}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
                aria-label="Close form"
              >
                &times;
              </button>
              <TodoForm editingTodo={editingTodo} onSuccess={handleSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TodoList;
