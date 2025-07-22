import React, { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      setIsLoggedIn(true);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

