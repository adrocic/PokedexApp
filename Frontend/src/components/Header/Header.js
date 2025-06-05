import React, { useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSearch,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import { PokemonContext } from '../PokemonProvider/PokemonProvider';
import FlexBox from '../FlexBox/FlexBox';
import Button from '../Button/Button';

const breakpoints = [1150, 950, 750];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const BackButton = styled(Button)(
  css({
    borderRadius: 'circle',
    fontSize: 4,
    color: 'white',
    bg: 'lessTransparent',
    width: '6',
    height: '6',
    ml: '5',
    [mq[2]]: {
      display: 'none',
    },
  })
);

const ForwardButton = styled(Button)(
  css({
    borderRadius: 'circle',
    fontSize: 4,
    color: 'white',
    bg: 'lessTransparent',
    width: '6',
    height: '6',
    mr: '5',
    [mq[2]]: {
      display: 'none',
    },
  })
);

const DeleteButton = styled(Button)(
  css({
    borderRadius: 'circle',
    bg: 'transparent',
    fontSize: '4',
    width: '5',
    height: '5',
    ':hover': css({
      boxShadow: 'none',
      transform: 'none',
    }),
    [mq[2]]: {
      fontSize: '2',
    },
  })
);

const SearchBarContainer = styled(FlexBox)(
  css({
    alignItems: 'center',
    height: '96px',
    minWidth: '480px',
    bg: 'almostTransparent',
    borderRadius: '5px',
    ':hover': css({
      boxShadow: '0px 0px 10px 0px rgb(0, 0, 0, .75);',
      transform: 'translate(0px, -1px)',
    }),
    [mq[2]]: {
      minWidth: '250px',
      height: '6',
    },
  })
);

const SearchBar = styled('input')(
  css({
    color: 'white',
    bg: 'transparent',
    fontSize: 7,
    fontWeight: 'bold',
    height: '96px',
    width: '400px',
    border: 'none',
    outline: 'none',
    '::placeholder': css({
      color: 'rgba(0, 0, 0, 0.15)',
      letterSpacing: '1.5',
    }),
    [mq[2]]: {
      width: '200px',
      fontSize: 5,
      height: '5',
    },
  })
);

const SearchIcon = styled(FlexBox)(
  css({
    ml: '50px',
    mr: '30px',
    fontSize: '5',
    [mq[2]]: {
      ml: '20px',
      mr: '10px',
      fontSize: '3',
    },
  })
);

const HeaderContainer = styled(FlexBox)(
  css({
    width: '100%',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    my: 4,
    [mq[2]]: {
      justifyContent: 'center',
      my: 2,
    },
  })
);

const Header = () => {
  const context = useContext(PokemonContext);
  const leftArrowIcon = <FontAwesomeIcon icon={faArrowLeft} />;
  const rightArrowIcon = <FontAwesomeIcon icon={faArrowRight} />;
  const deleteIcon = <FontAwesomeIcon icon={faTimesCircle} color="Gainsboro" />;
  const searchIcon = <FontAwesomeIcon icon={faSearch} color="Snow" />;

  const paginate = useCallback(
    forwardOrBack => {
      context.setCurrentPage(forwardOrBack);
    },
    [context]
  );

  // Updates the state of search on each keystroke based on the form event of onChange
  const filterSearch = useCallback(
    e => {
      e.preventDefault();
      context.setCurrentPage(1);
      context.setSearchQuery(e.target.value);
      e.target.value !== ''
        ? context.setShowDeleteButton(true)
        : context.setShowDeleteButton(false);
    },
    [context]
  );

  // Updates the state of search and clears it
  const clearSearch = useCallback(() => {
    context.setSearchQuery('');
    context.setCurrentPage(context.currentPage);
    context.setShowDeleteButton(false);
  }, [context]);

  const searchPokemonError = () =>
    context.cards === undefined ||
    (context.cards.length === 0 && (
      <FlexBox color="White" fontSize={2} mx={3}>
        Oops! No pokemon names match your search...
      </FlexBox>
    ));

  return (
    <FlexBox flexDirection="column" alignItems="center">
      <HeaderContainer>
        <BackButton
          onClick={() => {
            context.currentPage > 1 && paginate(context.currentPage - 1);
          }}
        >
          {leftArrowIcon}
        </BackButton>
        <SearchBarContainer>
          <SearchIcon>{searchIcon}</SearchIcon>
          <SearchBar
            autoFocus
            onChange={filterSearch}
            placeholder="Pokédex"
            value={context.searchQuery}
          ></SearchBar>
          {context.showDeleteButton && (
            <DeleteButton mr="30px" onClick={clearSearch}>
              {deleteIcon}
            </DeleteButton>
          )}
        </SearchBarContainer>
        <ForwardButton
          mr={5}
          onClick={() => {
            context.currentPage < context.finalPage &&
              paginate(context.currentPage + 1);
          }}
        >
          {rightArrowIcon}
        </ForwardButton>
      </HeaderContainer>
      {searchPokemonError()}
    </FlexBox>
  );
};

export default React.memo(Header);
