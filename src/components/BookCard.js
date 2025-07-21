import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const BookCard = ({ book }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
        <button
          onClick={handleReadClick}
          style={{
            backgroundColor: theme.accent,
            color: theme.primary,
            padding: "8px 12px", /* Smaller padding */
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            flexGrow: 1, /* Allow button to grow */
            marginRight: "5px", /* Small gap */
          }}
        >
          قراءة الكتاب
        </button>
        <span
          onClick={() => setIsLiked(!isLiked)}
          style={{
            cursor: "pointer",
            color: isLiked ? "red" : "white", /* White by default, red when liked */
            fontSize: "20px", /* Slightly smaller heart */
            backgroundColor: theme.primary, /* Background for the heart icon */
            padding: "4px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px", /* Fixed width for circular background */
            height: "30px", /* Fixed height for circular background */
          }}
        >
          {isLiked ? '❤️' : '♡'}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
// Minor change to trigger re-render