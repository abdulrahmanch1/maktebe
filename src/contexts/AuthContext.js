import React, { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "" ? true : false;
    } catch (error) {
      return false;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "" ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken && storedToken !== "" ? storedToken : null;
    } catch (error) {
      return null;
    }
  });

  // Set default Authorization header for axios on initial load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken && storedToken !== "") {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Error setting axios default header from localStorage:", error);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const { token: userToken, ...userData } = response.data; // Correctly extract token and rest of data as user

      

      setIsLoggedIn(true);
      setUser(userData);
      setToken(userToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userToken);
      // Set default Authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

      window.location.href = "/"; // Force reload and navigate to home
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Remove default Authorization header for axios
    delete axios.defaults.headers.common['Authorization'];
  };

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      token,
      login,
      logout,
    }),
    [isLoggedIn, user, token]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

