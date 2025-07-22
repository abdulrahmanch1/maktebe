
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";

const BookDetailsPage = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("الكتاب غير موجود أو حدث خطأ أثناء جلبه.");
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", textAlign: "center" }}>جاري تحميل تفاصيل الكتاب...</div>;
  }

  if (error) {
    return <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  if (!book) {
    return <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", textAlign: "center" }}>الكتاب غير موجود</div>;
  }

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ flex: "1", maxWidth: "400px", marginLeft: "40px" }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
        />
      </div>
      <div style={{ flex: "2", maxWidth: "600px", textAlign: "right" }}>
        <h1 style={{ color: theme.primary, borderBottom: `2px solid ${theme.accent}`, paddingBottom: "10px" }}>{book.title}</h1>
        <p style={{ fontSize: "1.3em", marginTop: "20px" }}><strong>المؤلف:</strong> <span style={{ color: theme.accent }}>{book.author}</span></p>
        <p style={{ fontSize: "1.2em" }}><strong>التصنيف:</strong> {book.category}</p>
        <p style={{ fontSize: "1.2em" }}><strong>سنة النشر:</strong> {book.publishYear}</p>
        <p style={{ fontSize: "1.2em" }}><strong>عدد الصفحات:</strong> {book.pages}</p>
        <p style={{ fontSize: "1.2em" }}><strong>اللغة:</strong> {book.language}</p>
        <h2 style={{ color: theme.primary, marginTop: "30px", borderTop: `1px solid ${theme.secondary}`, paddingTop: "20px" }}>الوصف</h2>
        <p style={{ fontSize: "1.1em", lineHeight: "1.8" }}>{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
