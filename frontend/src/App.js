import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { signIn, signUp, resetPassword, verifyEmail } from './components/services/firebase';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useAuthContext } from './components/contexts/AuthContext'; // Custom hook to manage auth state

function App() {
  const { user, setUser } = useAuthContext();
  
  useEffect(() => {
    // This effect will run when the component mounts.
    // We check if the user is already authenticated through Firebase.
    const unsubscribe = signInWithRedirect().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Authentication App</h1>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/login">
              {user ? <Navigate to="/dashboard" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Navigate to="/dashboard" /> : <Register />}
            </Route>
            <Route path="/dashboard">
              {!user ? <Navigate to="/login" /> : <h2>Welcome to Dashboard</h2>}
            </Route>
            <Route path="/" exact>
              <Navigate to="/login" />
            </Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
