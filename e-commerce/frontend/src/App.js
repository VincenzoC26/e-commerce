import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
import UserPage from './component/UserPage';
import RegistrationPage from './component/RegistrationPage';
import CartPage from './component/CartPage';
import ChangeEmail from './component/ChangeEmail';
import ChangePassword from './component/ChangePassword';

function App() {
  const [user, setUser] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <HomePage user={user} onLogout={handleLogout} />
              )
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage user={user} onLogout={handleLogout}/>} />
          <Route path="/cart" element={<CartPage user={user} onLogout={handleLogout}/>} />
          <Route path="/emailChange" element={<ChangeEmail user={user} onLogout = {handleLogout}/>} />
          <Route path="/passwordChange" element={<ChangePassword user={user} onLogout={handleLogout}/>} />
          
        </Routes>
        <div>
          {!user && (
            <AuthLink />
          )}
        </div>
      </div>
    </Router>
  );
}

function AuthLink() {
  const location = useLocation();

  // Mostra il testo e il link solo se non sei sulla pagina di registrazione
  if (location.pathname !== '/register') {
    return (
      <p class = "registration-link">
        Don't have an account? <Link to="/register">Click here to register</Link>
      </p>
    );
  }

  return null;
}

export default App;

