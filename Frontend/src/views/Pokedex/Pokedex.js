import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from '../../components/FlexBox';
import PokemonProvider from '../../components/PokemonProvider/PokemonProvider';
import PokemonList from '../../components/PokemonList/PokemonList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const breakpoints = [1150, 950, 850];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const PokedexContainer = styled(FlexBox)(
  css({
    minHeight: '100vh',
    width: '70%',
    bg: 'green',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [mq[0]]: {
      width: '85%',
    },
    [mq[1]]: {
      width: '100%',
    },
  })
);

const Pokedex = () => {
  return (
    <FlexBox justifyContent="center">
      <PokedexContainer>
        <PokemonProvider>
          <Header marginBottom={8} />
          <PokemonList />
          <Footer />
        </PokemonProvider>
      </PokedexContainer>
    </FlexBox>
  );
};

export default Pokedex;
