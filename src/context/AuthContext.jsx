import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsers, saveUser } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem("streamhub_session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error("Invalid email or password.");
    
    const userSession = { name: user.name, email: user.email, role: user.role };
    localStorage.setItem("streamhub_session", JSON.stringify(userSession));
    setSession(userSession);
    return userSession;
  };

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const role = (email.toLowerCase().includes("admin") || email.endsWith("@streamhub.com")) ? "admin" : "user";
    const newUser = { name, email, password, role };
    saveUser(newUser);
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("streamhub_session");
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);