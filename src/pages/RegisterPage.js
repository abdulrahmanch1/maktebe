
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/google-login`, {
          idToken: tokenResponse.id_token, // Use id_token for backend verification
        });
        const { user: userData, token: userToken } = res.data;
        // Assuming your login function can handle setting user data and token
        // You might need to adjust your login context function to accept these
        await login(userData.email, userToken); 
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
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        username,
        email,
        password,
      });
      // Log in the user immediately after successful registration
      await login(email, password); // Assuming login also handles setting user data
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", minHeight: "80vh" }}>
      <h1 style={{ textAlign: "center", color: theme.primary }}>إنشاء حساب</h1>
      <form onSubmit={handleSubmit} style={{ backgroundColor: theme.secondary, color: theme.background }}>
        <label style={{ color: theme.background }}>اسم المستخدم:</label>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ backgroundColor: theme.background, color: theme.primary, borderColor: theme.accent }}
        />
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
        <button type="submit" style={{ backgroundColor: theme.accent, color: theme.primary }}>إنشاء</button>
        <button
          type="button"
          onClick={() => googleLogin()}
          style={{
            backgroundColor: "#DB4437", // Google red
            color: "white",
            marginTop: "10px",
          }}
        >
          التسجيل عبر جوجل
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
