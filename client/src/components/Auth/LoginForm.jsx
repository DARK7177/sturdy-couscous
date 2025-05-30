import React, { useContext, useState } from "react";
import { login } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem("token", res.data.token);
            loginUser(res.data.token);
            alert("Login Successful");
            navigate("/");
        } catch (e) {
            alert(e.response?.data?.msg || "Error during login");
        }
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen flex items-center justify-center transition-colors duration-300`}>
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
                className={`${darkMode ? "bg-gray-800 text-white" : "bg-white"} p-8 rounded-xl shadow-md w-full max-w-sm`}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="text"s
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                    className="w-full px-4 py-2 mb-4 text-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full px-4 py-2 mb-6 text-white border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Signup
                    </Link>
                </p>
            </motion.form>
        </div>
    );
}

export default Login;
