
import React from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";

const HomePage = () => {
  return (
    <div>
      <h1>الكتب</h1>
      <div>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
