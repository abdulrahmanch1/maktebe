
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ backgroundColor: theme.primary, color: theme.background }}>
      <nav>
        <Link to="/">الرئيسية</Link>
        <Link to="/complaints">الشكاوي</Link>
        <Link to="/settings">الإعدادات</Link>
        <Link to="/favorites">المفضلة</Link>
        <Link to="/reading-list">قائمة القراءة</Link>
      </nav>
      <div>
        <button onClick={() => toggleTheme("theme1")}>Theme 1</button>
        <button onClick={() => toggleTheme("theme2")}>Theme 2</button>
        <button onClick={() => toggleTheme("theme3")}>Theme 3</button>
        <button onClick={() => toggleTheme("theme4")}>Theme 4</button>
      </div>
      <div>
        <Link to="/settings">اسم المستخدم</Link>
        <img src="https://via.placeholder.com/50" alt="user" />
      </div>
    </header>
  );
};

export default Header;
