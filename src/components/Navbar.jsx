import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <Link to="/" className="nav__brand">STREAM<span>HUB</span></Link>
      
      {session && (
        <nav className="nav__links">
          <Link to="/">Browse</Link>
          <Link to="/watchlist">My List</Link>
        </nav>
      )}

      <div className="nav__auth">
        {session ? (
          <>
            {session.role === "admin" && (
              <Link to="/admin" style={{ color: "#e50914", fontWeight: "600", marginRight: "1rem" }}>
                [Admin Panel]
              </Link>
            )}
            <span style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
              Hi, <strong>{session.name}</strong>
            </span>
            <button onClick={handleLogout} className="btn">Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Log in</Link>
            <Link to="/signup" className="btn btn--active">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}