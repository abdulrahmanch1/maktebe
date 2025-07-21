
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const ReadingListPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary }}>
      <h1>قائمة القراءة</h1>
      <h2>الكتب التي لم تتم قراءتها</h2>
      <div>
        {books.slice(2, 4).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <h2>الكتب التي تمت قراءتها</h2>
      <div>
        {books.slice(4, 6).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ReadingListPage;
