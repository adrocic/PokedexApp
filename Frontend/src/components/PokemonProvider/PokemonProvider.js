import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  // finalPage stores the last page number returned from the API. 0 means
  // that we haven't loaded any pages yet.
  const [finalPage, setFinalPage] = useState(0);

  // loading indicates if the pokemon list is currently being fetched. It
  // should be a boolean value rather than an array containing a boolean.
  const [loading, setLoading] = useState(false);
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
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokemonProvider;
