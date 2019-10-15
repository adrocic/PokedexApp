import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../PokemonProvider/PokemonProvider';
import FlexBox from '../../components/FlexBox';

const PokemonList = () => {
  const context = React.useContext(PokemonContext);

  return (
    <FlexBox flexWrap="wrap" justifyContent="center" mb="4" mx="3">
      {context.cards.map((pokemon, index) => (
        <Link
          key={pokemon.id + index}
          to={`/${pokemon.id}`}
          style={{ textDecoration: 'none' }}
        >
          <PokemonCard
            key={pokemon.id + index}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        </Link>
      ))}
    </FlexBox>
  );
};

export default PokemonList;
