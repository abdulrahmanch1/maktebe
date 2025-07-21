
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const BookCard = ({ book }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.primary,
        border: `1px solid ${theme.secondary}`,
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "200px",
        display: "inline-block",
        verticalAlign: "top",
      }}
    >
      <img
        src={book.cover}
        alt={book.title}
        style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "4px" }}
      />
      <h3 style={{ color: theme.accent }}>{book.title}</h3>
      <p>المؤلف: {book.author}</p>
      <p>التصنيف: {book.category}</p>
    </div>
  );
};

export default BookCard;
