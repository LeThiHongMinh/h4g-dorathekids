// /src/components/auth/Register.js

import React, { useState } from 'react';
import { signUp } from '../services/firebase';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
