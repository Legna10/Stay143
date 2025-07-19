import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png'; 


function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/stay');
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Welcome to...</h1>
        <img src={logo} alt="Stay143 Logo" className="home-logo" />
        <p className="home-description">No photocard here... just hidden flags 🎟️🚩</p>
        <button className="button" onClick={handleStart}>Let's get started</button>
      </div>
    </div>
  );
}

export default Home;
