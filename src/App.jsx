import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Stay from './components/Stay/Stay';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; 
  }

  return (
    <div className="App">
      {location.pathname !== '/login' && <Navbar user={user} />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stay"
          element={
            <ProtectedRoute>
              <Stay />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
