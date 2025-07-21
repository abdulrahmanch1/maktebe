
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const BookCard = ({ book }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate(`/book/${book.id}`);
  };

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
        height: "380px", /* Fixed height for the card */
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img
        src={book.cover}
        alt={book.title}
        style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "4px" }}
      />
      <h3 style={{ color: theme.accent }}>{book.title}</h3>
      <p>المؤلف: {book.author}</p>
      <p>التصنيف: {book.category}</p>
      <button
        onClick={handleReadClick}
        style={{
          backgroundColor: theme.accent,
          color: theme.primary,
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
          width: "100%", /* Make button full width of card */
        }}
      >
        قراءة الكتاب
      </button>
    </div>
  );
};

export default BookCard;
