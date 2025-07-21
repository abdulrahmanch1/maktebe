
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const AdminPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: theme.primary }}>صفحة الإدارة</h1>
      <p>هذه الصفحة مخصصة للمسؤولين فقط.</p>
      {/* Add admin specific content here */}
    </div>
  );
};

export default AdminPage;
