
import React, { useContext, useState } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل"); // New state for category filter

  // Get unique categories from books data
  const categories = ["الكل", ...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || book.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: theme.background, color: theme.primary, padding: "20px" }}>
      <h1 style={{ color: theme.primary, textAlign: "center" }}>البحث عن الكتب</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="ابحث عن كتاب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "50%",
            borderRadius: "5px",
            border: `1px solid ${theme.secondary}`,
            backgroundColor: theme.background,
            color: theme.primary,
            marginBottom: "10px",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: `1px solid ${theme.secondary}`,
            backgroundColor: theme.background,
            color: theme.primary,
            marginLeft: "10px",
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", minHeight: "70vh" }}>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
