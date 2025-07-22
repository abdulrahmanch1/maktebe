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
  const { isLoggedIn, user, token } = useContext(AuthContext); // Get token from AuthContext

  // Fetch favorites when user logs in or changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn && user && user._id && token) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
  }, [isLoggedIn, user, token]); // Add token to dependency array

  const toggleFavorite = async (bookId) => {
    if (!isLoggedIn || !user || !user._id || !token) {
      alert("Please log in to add books to your favorites.");
      return;
    }

    try {
      if (favorites.includes(bookId)) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/users/${user._id}/favorites/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(favorites.filter((id) => id !== bookId));
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/users/${user._id}/favorites`, { bookId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
