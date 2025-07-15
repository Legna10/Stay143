import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './Navbar.css';

function Navbar({ user }) {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {user && (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/stay" className="nav-link">Stay</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.displayName || user.email}</span>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
