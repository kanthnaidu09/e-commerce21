import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('http://localhost:5000/auth/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="username" onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Username" />
      <input name="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;