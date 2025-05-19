import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('http://localhost:5000/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="username" onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" />
      <input name="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;