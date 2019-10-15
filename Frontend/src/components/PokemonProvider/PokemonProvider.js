import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

const PokemonProvider = pokemon => {
  const [cards, setCards] = useState([]);
  const [finalPage, setFinalPage] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHeaderArrows, setShowHeaderArrows] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const res = await axios.get(
        `/api/v1/pokemon?page=${currentPage}&name=${searchQuery}`
      );
      setCards(res.data['data']);
      setFinalPage(res.data['meta'].last_page);
      setLoading(false);
    };
    fetchCards();
  }, [currentPage, searchQuery]);

  return (
    <PokemonContext.Provider
      value={{
        cards,
        finalPage,
        loading,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        showDeleteButton,
        setShowDeleteButton,
        showHeaderArrows,
        setShowHeaderArrows,
      }}
    >
      {pokemon.children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
