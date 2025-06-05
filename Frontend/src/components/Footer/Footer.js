import React, { useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { PokemonContext } from '../PokemonProvider/PokemonProvider';
import FlexBox from '../FlexBox/FlexBox';
import Button from '../Button/Button';

const breakpoints = [1150, 950, 750];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const FooterContainer = styled(FlexBox)(
  css({
    display: 'none',
    position: 'fixed',
    bottom: '0',
    bg: 'leastTransparent',
    width: '100%',
    height: '60px',
    justifyContent: 'space-between',
    alignItems: 'center',
    [mq[2]]: {
      display: 'flex',
    },
  })
);

const Footer = () => {
  const context = useContext(PokemonContext);
  const leftArrowIcon = <FontAwesomeIcon icon={faArrowLeft} size="2x" />;
  const rightArrowIcon = <FontAwesomeIcon icon={faArrowRight} size="2x" />;

  const paginate = useCallback(
    forwardOrBack => {
      context.setCurrentPage(forwardOrBack);
    },
    [context]
  );

  return (
    <FooterContainer>
      <Button
        bg="transparent"
        mx={3}
        onClick={() => {
          context.currentPage > 1 && paginate(context.currentPage - 1);
        }}
      >
        {leftArrowIcon}
      </Button>
      <Button
        bg="transparent"
        mx={3}
        onClick={() => {
          context.currentPage < context.finalPage &&
            paginate(context.currentPage + 1);
        }}
      >
        {rightArrowIcon}
      </Button>
    </FooterContainer>
  );
};

export default React.memo(Footer);
