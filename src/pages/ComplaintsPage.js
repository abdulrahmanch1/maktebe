
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ComplaintsPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>الشكاوي</h1>
      <form>
        <textarea placeholder="اكتب شكواك هنا"></textarea>
        <button type="submit">إرسال</button>
      </form>
    </div>
  );
};

export default ComplaintsPage;
