
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";

const AdminPage = () => {
  const { theme } = useContext(ThemeContext);
  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center", marginBottom: "30px" }}>إدارة الكتب</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: theme.secondary, borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ color: theme.background, textAlign: "center", marginBottom: "20px" }}>إضافة كتاب جديد</h2>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: theme.background, display: "block", marginBottom: "5px" }}>عنوان الكتاب</label>
            <input type="text" placeholder="أدخل عنوان الكتاب" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${theme.accent}`, backgroundColor: theme.background, color: theme.primary }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: theme.background, display: "block", marginBottom: "5px" }}>اسم الكاتب</label>
            <input type="text" placeholder="أدخل اسم الكاتب" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${theme.accent}`, backgroundColor: theme.background, color: theme.primary }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: theme.background, display: "block", marginBottom: "5px" }}>التصنيف</label>
            <select style={{ width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${theme.accent}`, backgroundColor: theme.background, color: theme.primary }}>
              {categories.map((category) => (
                <option key={category} value={category}>{
                  category
                }</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: theme.background, display: "block", marginBottom: "5px" }}>الوصف</label>
            <textarea placeholder="أدخل وصف الكتاب" rows="4" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${theme.accent}`, backgroundColor: theme.background, color: theme.primary }}></textarea>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: theme.background, display: "block", marginBottom: "5px" }}>رابط صورة الغلاف</label>
            <input type="text" placeholder="أدخل رابط الصورة" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: `1px solid ${theme.accent}`, backgroundColor: theme.background, color: theme.primary }} />
          </div>
          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "4px", border: "none", backgroundColor: theme.accent, color: theme.primary, fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>إضافة الكتاب</button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: theme.primary, textAlign: "center", marginBottom: "20px" }}>الكتب المضافة</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {books.map((book) => (
            <div key={book.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", backgroundColor: theme.secondary, borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
              <p style={{ color: theme.background, margin: "0", fontWeight: "bold" }}>{book.title}</p>
              <div>
                <button style={{ backgroundColor: theme.accent, color: theme.primary, border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", marginLeft: "10px" }}>تعديل</button>
                <button style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
