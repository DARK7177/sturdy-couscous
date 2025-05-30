import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const loginUser = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}