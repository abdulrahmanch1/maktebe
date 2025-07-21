
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const AdminPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>صفحة الإدارة</h1>
    </div>
  );
};

export default AdminPage;
