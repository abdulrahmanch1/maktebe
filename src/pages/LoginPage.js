
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const LoginPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>تسجيل الدخول</h1>
      <form>
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور" />
        <button type="submit">دخول</button>
      </form>
    </div>
  );
};

export default LoginPage;
