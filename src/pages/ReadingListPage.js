
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const ReadingListPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>قائمة القراءة</h1>
      <h2 style={{ color: theme.primary, textAlign: "center" }}>الكتب التي لم تتم قراءتها</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {books.slice(2, 4).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <h2 style={{ color: theme.primary, textAlign: "center", marginTop: "30px" }}>الكتب التي تمت قراءتها</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {books.slice(4, 6).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ReadingListPage;
