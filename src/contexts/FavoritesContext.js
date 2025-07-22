import React, { createContext, useState, useMemo } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: (bookId) => {},
  isFavorite: (bookId) => false,
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (bookId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(bookId)) {
        return prevFavorites.filter((id) => id !== bookId);
      } else {
        return [...prevFavorites, bookId];
      }
    });
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
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
