import React, { useState } from "react";
import { signup } from '../../api/api';
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({ name: '', username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.username.trim()) newErrors.username = "Username is required";
        if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await signup(form);
            alert(res.data.msg);
            navigate("/login");
        } catch (e) {
            alert(e.response?.data?.msg || 'Error during Signup');
        }
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center transition-colors duration-300`}>
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} p-8 rounded-xl shadow-md w-full max-w-md space-y-6`}
            >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                            border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                            border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                            border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white py-2 rounded-md transition-colors"
                >
                    Sign Up
                </button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.form>
        </div>
    );
}

export default Signup;
