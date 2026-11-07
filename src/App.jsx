import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watch from "./pages/Watch";
import Watchlist from "./pages/Watchlist";
import Admin from "./pages/Admin";

function ProtectedRoute({ children, adminOnly = false }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (adminOnly && session.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/watch/:id" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      </Routes>
      <footer className="footer">
        <p>StreamHub — React + Vite Project. Data stored in LocalStorage.</p>
      </footer>
    </>
  );
}