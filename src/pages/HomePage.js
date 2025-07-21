
import React, { useContext } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>الكتب المتوفرة</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
