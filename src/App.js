import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Register from './components/SignUp';
import Login from './components/Login';
import FoodItems from './components/FoodItems';
import IndexPage from './components/IndexPage';
import CheckOut from './components/Cart';
import ThankYou from './components/ThankYou';

const NotFound = () => (
  <div className="text-center mt-5">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist!</p>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/fooditems"
              element={
                <ProtectedRoute>
                  <FoodItems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOut />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thankyou"
              element={
                <ProtectedRoute>
                  <ThankYou />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
