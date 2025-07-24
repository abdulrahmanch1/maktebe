
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/google-login`, {
          idToken: tokenResponse.access_token, // Use access_token for backend verification
        });
        const { user: userData, token: userToken } = res.data;
        login(userData.email, userToken); // Use your existing login function to set context
        navigate("/");
      } catch (err) {
        console.error("Google login failed:", err);
        setError(err.response?.data?.message || "Google login failed");
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await login(email, password);
    if (result.success) {
      navigate("/"); // Redirect to home page on successful login
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", minHeight: "80vh" }}>
      <h1 style={{ textAlign: "center", color: theme.primary }}>تسجيل الدخول</h1>
      <form onSubmit={handleSubmit} style={{ backgroundColor: theme.secondary, color: theme.background }}>
        <label style={{ color: theme.background }}>البريد الإلكتروني:</label>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ backgroundColor: theme.background, color: theme.primary, borderColor: theme.accent }}
        />
        <label style={{ color: theme.background }}>كلمة المرور:</label>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ backgroundColor: theme.background, color: theme.primary, borderColor: theme.accent }}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <button type="submit" style={{ backgroundColor: theme.accent, color: theme.primary }}>دخول</button>
        <button
          type="button"
          onClick={() => googleLogin()}
          style={{
            backgroundColor: "#DB4437", // Google red
            color: "white",
            marginTop: "10px",
          }}
        >
          تسجيل الدخول عبر جوجل
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
