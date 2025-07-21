
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const BookCard = ({ book }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.category}</p>
    </div>
  );
};

export default BookCard;
