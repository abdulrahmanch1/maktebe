import React, { createContext, useState, useMemo, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: (bookId) => {},
  isFavorite: (bookId) => false,
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

  // Fetch favorites when user logs in or changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn && user && user._id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user._id}`);
          setFavorites(response.data.favorites || []);
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
          setFavorites([]);
        }
      } else {
        setFavorites([]); // Clear favorites if not logged in
      }
    };
    fetchFavorites();
  }, [isLoggedIn, user]);

  const toggleFavorite = async (bookId) => {
    if (!isLoggedIn || !user || !user._id) {
      alert("Please log in to add books to your favorites.");
      return;
    }

    try {
      if (favorites.includes(bookId)) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/users/${user._id}/favorites/${bookId}`);
        setFavorites(favorites.filter((id) => id !== bookId));
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/users/${user._id}/favorites`, { bookId });
        setFavorites([...favorites, bookId]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  const contextValue = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
