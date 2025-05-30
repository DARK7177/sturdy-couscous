import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/LoginForm';
import Signup from './components/Auth/SignupForm';
import TodoList from './components/Todo/List';
import TodoForm from './components/Todo/Item';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={token ? <TodoList /> : <Navigate to='/login' />} />
      <Route path='/add-todo' element={token ? <TodoForm /> : <Navigate to='/login' />} />
      <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
      <Route path='/signup' element={!token ? <Signup /> : <Navigate to='/' />} />
    </Routes>
  );
}

export default App;
