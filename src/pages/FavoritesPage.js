
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const FavoritesPage = () => {
  const { theme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>الكتب المفضلة</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>لم تقم بإضافة أي كتب إلى المفضلة بعد.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
