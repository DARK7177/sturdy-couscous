import React, { useState, useEffect, useContext } from "react";
import { createTodo, updateTodo } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const TodoForm = ({ editingTodo, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false, 
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description,
        completed: editingTodo.completed || false,
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        await updateTodo(editingTodo._id, formData, token);
      } else {
        await createTodo(formData, token);
      }
      setFormData({ title: "", description: "", completed: false });
      if (onSuccess) onSuccess();
    } catch (e) {
      alert("Error Saving Todos");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      {/* <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
        <span>Completed</span>
      </label> */}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition-colors"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </motion.form>
  );
};

export default TodoForm;
