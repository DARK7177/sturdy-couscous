import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:5000"
})


export const signup = (data) =>
    API.post('/api/user/signup', data);

export const login = (data) =>
    API.post('/api/user/login', data);

export const getTodos = (token) =>
    API.get('/api/todo', {
        headers: { Authorization: `Bearer ${token}` }
    });

export const createTodo = (data, token) =>
    API.post('/api/todo', data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateTodo = (id, data, token) =>
    API.put(`/api/todo/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const deleteTodo = (id, token) =>
    API.delete(`/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });