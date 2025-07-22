
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { books } from "../data/books"; // Still using local books data for now
import BookCard from "../components/BookCard";

const FavoritesPage = () => {
  const { theme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);
  const [favoriteBooksData, setFavoriteBooksData] = useState([]);

  useEffect(() => {
    // Filter books from local data based on favorite IDs
    const filteredBooks = books.filter((book) => favorites.includes(book.id));
    setFavoriteBooksData(filteredBooks);
  }, [favorites]);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>الكتب المفضلة</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {favoriteBooksData.length > 0 ? (
          favoriteBooksData.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>لم تقم بإضافة أي كتب إلى المفضلة بعد.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
