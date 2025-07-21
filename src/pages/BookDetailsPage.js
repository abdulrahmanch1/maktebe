
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";

const BookDetailsPage = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>الكتاب غير موجود</div>;
  }

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: theme.primary }}>{book.title}</h1>
      <img
        src={book.cover}
        alt={book.title}
        style={{ maxWidth: "300px", height: "auto", borderRadius: "8px", marginBottom: "20px" }}
      />
      <p style={{ fontSize: "1.2em" }}>المؤلف: <span style={{ fontWeight: "bold", color: theme.accent }}>{book.author}</span></p>
      <p style={{ fontSize: "1.2em" }}>التصنيف: <span style={{ fontWeight: "bold", color: theme.accent }}>{book.category}</span></p>
      {/* Add more details here if available in mock data */}
    </div>
  );
};

export default BookDetailsPage;
