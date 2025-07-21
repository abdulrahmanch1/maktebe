
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";

const BookDetailsPage = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <div>الكتاب غير موجود</div>;
  }

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>{book.title}</h1>
      <img src={book.cover} alt={book.title} />
      <p>المؤلف: {book.author}</p>
      <p>التصنيف: {book.category}</p>
    </div>
  );
};

export default BookDetailsPage;
