import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/fooditems'); 
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const simulatedAPIResponse = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storedUser && storedUser.email === email && storedUser.password === password) {
          resolve(true);
        } else {
          reject(new Error('Invalid credentials')); 
        }
      }, 1000);
    });

    simulatedAPIResponse
      .then(() => {
        localStorage.setItem('isAuthenticated', 'true');
        setMessage('Login successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Invalid email or password.');
      });
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Login</h2>
      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
