import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import FlexBox from '../../components/FlexBox';
import Button from '../../components/Button';

const breakpoints = [1150, 950, 850];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const DetailContainer = styled(FlexBox)(
  css({
    bg: 'green',
    height: '100vh',
    width: '65%',
    flexDirection: 'column',
    alignItems: 'center',
    [mq[0]]: {
      width: '85%',
    },
    [mq[1]]: {
      width: '100%',
    },
  })
);

const Header = styled(FlexBox)(
  css({
    my: '4',
    height: '7',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    [mq[2]]: {
      my: '2',
      height: '6',
    },
  })
);

const PokemonName = styled(FlexBox)(
  css({
    mx: 'auto',
    fontSize: '7',
    fontWeight: 'bold',
    color: 'white',
    [mq[2]]: {
      fontSize: '5',
    },
  })
);

const BackButton = styled(Button)(
  css({
    borderRadius: 'circle',
    fontSize: 4,
    color: 'green',
    bg: 'white',
    width: '6',
    height: '6',
    ml: '5',
    justifySelf: 'flex-start',
    [mq[2]]: {
      ml: '3',
      fontSize: 3,
      height: '5',
      width: '5',
    },
  })
);

const DetailCard = styled(FlexBox)(
  css({
    flexDirection: 'column',
    width: '60%',
    height: 'auto',
    bg: 'white',
    borderRadius: 'normal',
    mb: '4',
    [mq[0]]: {
      width: '70%',
    },
    [mq[1]]: {
      width: '80%',
    },
    [mq[2]]: {
      width: '95%',
    },
  })
);

const Type = styled(FlexBox)(
  css({
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'normal',
    border: '1px solid',
    fontSize: 0,
    marginRight: '10px',
    height: '22px',
    width: 'auto',
    padding: '0px 5px',
  })
);

const StatNameContainer = styled(FlexBox)(
  css({
    flexDirection: 'column',
    justifyContent: 'space-between',
    ml: 'auto',
  })
);

const StatBarsContainer = styled(FlexBox)(
  css({
    flexDirection: 'column',
    width: '255px',
    justifyContent: 'space-between',
    mx: '4',
    [mq[2]]: {
      width: '130px',
      mx: '3',
    },
  })
);

const StatBar = styled(FlexBox)(
  css({
    bg: 'lightGreen',
    width: '100%',
    borderRadius: 'normal',
  })
);

const StatBarFilling = styled(FlexBox)(
  css({
    pl: '1',
    color: 'white',
    bg: 'green',
    borderRadius: 'normal',
  })
);

const SectionSeperator = styled(FlexBox)(
  css({
    bg: 'green',
    color: 'white',
    mx: '4',
    mt: '3',
    pl: '3',
    py: '2',
    alignItems: 'center',
    borderRadius: 'normal',
    [mq[2]]: {
      mx: '3',
    },
  })
);

const DescriptionContainer = styled(FlexBox)(
  css({
    flexDirection: 'column',
    mx: '5',
    my: '3',
    [mq[2]]: {
      mx: '4',
    },
  })
);

const ProfileContainer = styled(FlexBox)(
  css({
    mx: '5',
    my: '3',
    [mq[2]]: {
      mx: '4',
    },
  })
);

const ProfileItem = styled(FlexBox)(
  css({
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '25%',
  })
);

const PokemonDetail = ({ match }) => {
  const leftArrowIcon = <FontAwesomeIcon icon={faArrowLeft} />;
  const [pokemon, setPokemon] = useState({
    types: [],
    eggGroups: [],
    abilities: [],
    stats: [],
  });

  const {
    id,
    name,
    stats: {
      hp = 0,
      speed = 0,
      attack = 0,
      defense = 0,
      'special-attack': specialAttack = 0,
      'special-defense': specialDefense = 0,
    } = {},
  } = pokemon;

  const maxStatMultiplier = 100 / 255;

  const {
    hpPercent,
    speedPercent,
    attackPercent,
    defensePercent,
    specialAttackPercent,
    specialDefensePercent,
  } = useMemo(
    () => ({
      hpPercent: hp * maxStatMultiplier,
      speedPercent: speed * maxStatMultiplier,
      attackPercent: attack * maxStatMultiplier,
      defensePercent: defense * maxStatMultiplier,
      specialAttackPercent: specialAttack * maxStatMultiplier,
      specialDefensePercent: specialDefense * maxStatMultiplier,
    }),
    [hp, speed, attack, defense, specialAttack, specialDefense]
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await Axios.get(`/api/v1/pokemon/${match.params.id}`);
      setPokemon(res.data);
    };
    fetchPokemon();
  }, [match.params.id]);

  return (
    <FlexBox justifyContent="center">
      <DetailContainer>
        <Header>
          <Link to={`/pokedex`}>
            <BackButton>{leftArrowIcon}</BackButton>
          </Link>
          <PokemonName>{pokemon.name}</PokemonName>
          <FlexBox mr={6}></FlexBox>
        </Header>
        <DetailCard>
          <FlexBox
            justifyContent="space-between"
            borderBottom="1px solid lightGrey"
          >
            <FlexBox my={3} mx={3} fontWeight="bold">
              {name} #{id}
            </FlexBox>
            <FlexBox alignItems="center">
              {pokemon.types.map((type, index) => (
                <Type
                  bg={`light${type}`}
                  borderColor={`${type}`}
                  color={`${type}`}
                  key={id + index}
                >
                  {type}
                </Type>
              ))}
            </FlexBox>
          </FlexBox>
          <FlexBox height={7} my={4}>
            <FlexBox mx="auto">
              <img src={`/pokemon_images/${id}.png`}></img>
            </FlexBox>
            <StatNameContainer>
              <FlexBox>HP</FlexBox>
              <FlexBox>Attack</FlexBox>
              <FlexBox>Defense</FlexBox>
              <FlexBox>Speed</FlexBox>
              <FlexBox>Sp.Att</FlexBox>
              <FlexBox>Sp.Def</FlexBox>
            </StatNameContainer>
            <StatBarsContainer>
              <StatBar>
                <StatBarFilling width={`${hpPercent}%`}>{hp}</StatBarFilling>
              </StatBar>
              <StatBar>
                <StatBarFilling width={`${attackPercent}%`}>
                  {attack}
                </StatBarFilling>
              </StatBar>
              <StatBar>
                <StatBarFilling width={`${defensePercent}%`}>
                  {defense}
                </StatBarFilling>
              </StatBar>
              <StatBar>
                <StatBarFilling width={`${speedPercent}%`}>
                  {speed}
                </StatBarFilling>
              </StatBar>
              <StatBar>
                <StatBarFilling width={`${specialAttackPercent}%`}>
                  {specialAttack}
                </StatBarFilling>
              </StatBar>
              <StatBar>
                <StatBarFilling width={`${specialDefensePercent}%`}>
                  {specialDefense}
                </StatBarFilling>
              </StatBar>
            </StatBarsContainer>
          </FlexBox>
          <DescriptionContainer>
            <FlexBox mb={3} fontSize={2} fontWeight="bold">
              {pokemon.genus}
            </FlexBox>
            <FlexBox>{pokemon.description}</FlexBox>
          </DescriptionContainer>
          <SectionSeperator>Profile</SectionSeperator>
          <ProfileContainer>
            <ProfileItem>
              <FlexBox fontWeight="bold">Height:</FlexBox>
              <FlexBox fontWeight="bold" mt={3}>
                Weight:
              </FlexBox>
            </ProfileItem>
            <ProfileItem>
              <FlexBox>{pokemon.height}m</FlexBox>
              <FlexBox mt={3}>{pokemon.weight} kg</FlexBox>
            </ProfileItem>
            <ProfileItem>
              <FlexBox fontWeight="bold">Abilities:</FlexBox>
              <FlexBox mt={3} fontWeight="bold">
                Egg Groups:
              </FlexBox>
            </ProfileItem>
            <ProfileItem>
              <FlexBox flexWrap="wrap">{pokemon.abilities.join(', ')}</FlexBox>
              <FlexBox flexWrap="wrap" mt={3}>
                {pokemon.eggGroups.join(', ')}
              </FlexBox>
            </ProfileItem>
          </ProfileContainer>
        </DetailCard>
      </DetailContainer>
    </FlexBox>
  );
};

PokemonDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PokemonDetail;
