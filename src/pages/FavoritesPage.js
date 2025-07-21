
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const FavoritesPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>الكتب المفضلة</h1>
      <div>
        {books.slice(0, 2).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
