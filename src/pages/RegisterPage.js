
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>إنشاء حساب</h1>
      <form>
        <input type="text" placeholder="اسم المستخدم" />
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور" />
        <button type="submit">إنشاء</button>
      </form>
    </div>
  );
};

export default RegisterPage;
