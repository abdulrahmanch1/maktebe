
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <Link to="/complaints" style={{ color: theme.background }}>الشكاوي</Link>
        <Link to="/settings" style={{ color: theme.background }}>الإعدادات</Link>
        <Link to="/favorites" style={{ color: theme.background }}>المفضلة</Link>
        <Link to="/reading-list" style={{ color: theme.background }}>قائمة القراءة</Link>
      </nav>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => toggleTheme("theme1")}
          style={{ backgroundColor: theme.secondary, color: theme.background }}
        >
          Theme 1
        </button>
        <button
          onClick={() => toggleTheme("theme2")}
          style={{ backgroundColor: theme.secondary, color: theme.background }}
        >
          Theme 2
        </button>
        <button
          onClick={() => toggleTheme("theme3")}
          style={{ backgroundColor: theme.secondary, color: theme.background }}
        >
          Theme 3
        </button>
        <button
          onClick={() => toggleTheme("theme4")}
          style={{ backgroundColor: theme.secondary, color: theme.background }}
        >
          Theme 4
        </button>
      </div>
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
