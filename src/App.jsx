import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAppContext } from './helpers/ContextApi';
import './App.css';
import { AppProvider } from './helpers/ContextApi';
import Home from './pages/Home';
import Question from './pages/Question';
import Login from './pages/Login';

function AppContent() {
  const { token } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={token ? (
        <>
          <Home />
          <Question />
        </>
      ) : (
        <Navigate to="/login" />
      )} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;
