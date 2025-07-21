
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const SettingsPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>الإعدادات</h1>
      <h2>إعدادات المظهر</h2>
      {/* Theme selection buttons are in the Header */}
      <h2>إعدادات الحساب</h2>
      <form>
        <input type="text" placeholder="اسم المستخدم" />
        <input type="email" placeholder="البريد الإلكتروني" />
        <input type="password" placeholder="كلمة المرور الجديدة" />
        <button type="submit">حفظ التغييرات</button>
      </form>
    </div>
  );
};

export default SettingsPage;
