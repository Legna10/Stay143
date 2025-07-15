import React, { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert(`Welcome, ${result.user.displayName}`);
        navigate('/');
      })
      .catch((error) => {
        console.error('Google Login Error:', error);
        alert('Google login failed');
      });
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        alert(`Welcome back, ${userCred.user.email}`);
        navigate('/'); 
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Registered as ${userCred.user.email}`);
        await sendEmailVerification(userCred.user);
        alert('Verification email sent. Please check your inbox.');
        navigate('/'); 
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      
      <div className="login-form">
        <h1 className="login-title">Login to Stay143</h1>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={handleEmailAuth}>
          {isLogin ? 'Login with Email' : 'Register with Email'}
        </button>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>

        <hr className="divider" />

        <button className="button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
