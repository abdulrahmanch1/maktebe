
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {
    const { theme } = useContext(ThemeContext);

  return (
    <header
      style={{
        backgroundColor: theme.primary,
        color: theme.background,
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <nav>
        <Link to="/" style={{ color: theme.background }}>الرئيسية</Link>
        <Link to="/complaints" style={{ color: theme.background }}>الشكاوى</Link>
        <Link to="/settings" style={{ color: theme.background }}>الإعدادات</Link>
        <Link to="/favorites" style={{ color: theme.background }}>المفضلة</Link>
        <Link to="/reading-list" style={{ color: theme.background }}>قائمة القراءة</Link>
      </nav>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/settings" style={{ color: theme.background }}>اسم المستخدم</Link>
        <img
          src="https://via.placeholder.com/50"
          alt="user"
          style={{ borderRadius: "50%", width: "40px", height: "40px" }}
        />
      </div>
    </header>
  );
};

export default Header;
