import React from 'react';
import { Link } from 'react-router-dom';

import PokemonCard from '../PokemonCard/PokemonCard';
import { PokemonContext } from '../PokemonProvider/PokemonProvider';
import FlexBox from '../../components/FlexBox';

const PokemonList = () => {
  const { cards } = React.useContext(PokemonContext);

  return (
    <FlexBox flexWrap="wrap" justifyContent="center" mb="4" mx="3">
      {cards.map((pokemon, index) => (
        <Link
          key={pokemon.id + index}
          to={`/${pokemon.id}`}
          style={{ textDecoration: 'none' }}
        >
          <PokemonCard
            key={pokemon.id + index}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
          />
        </Link>
      ))}
    </FlexBox>
  );
};

export default React.memo(PokemonList);
