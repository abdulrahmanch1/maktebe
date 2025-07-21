
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const ReadingListPage = () => {
  const { theme } = useContext(ThemeContext);
  const [showReadBooks, setShowReadBooks] = useState(true); // true for read, false for unread

  // Mock data for read and unread books
  const readBooks = books.slice(0, 3); // Example: first 3 books are read
  const unreadBooks = books.slice(3); // Example: remaining books are unread

  const booksToDisplay = showReadBooks ? readBooks : unreadBooks;

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>قائمة القراءة</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setShowReadBooks(true)}
          style={{
            backgroundColor: showReadBooks ? theme.accent : theme.secondary,
            color: theme.primary,
            margin: "0 10px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          الكتب التي تم قراءتها
        </button>
        <button
          onClick={() => setShowReadBooks(false)}
          style={{
            backgroundColor: !showReadBooks ? theme.accent : theme.secondary,
            color: theme.primary,
            margin: "0 10px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          الكتب التي لم تتم قراءتها
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {booksToDisplay.length > 0 ? (
          booksToDisplay.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>لا توجد كتب في هذه القائمة.</p>
        )}
      </div>
    </div>
  );
};

export default ReadingListPage;
