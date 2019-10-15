/* eslint-disable react/prop-types */
import React from 'react';
import FlexBox from '../FlexBox';
import Box from '../Box';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import { keyframes } from '@emotion/core';
import { rubberBand } from 'react-animations';

const PokemonCard = props => {
  const id = props.id;
  const name = props.name;
  const types = props.types;

  const bounceAnimation = keyframes`${rubberBand}`;

  const BouncyDiv = styled.div`
    animation: 1s 0.7s ${bounceAnimation};
  `;

  const Card = styled(FlexBox)(
    css({
      borderRadius: 'normal',
      color: 'darkerGrey',
      height: '252px',
      width: '220px',
      bg: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      m: 10,
      ':hover': css({
        boxShadow: '0px 0px 10px 0px rgb(0, 0, 0, .75);',
        transform: 'translate(0px, -1px)',
      }),
      ':active': css({
        boxShadow: '0 0px',
        transform: 'translate(0px, 3px)',
      }),
    })
  );

  const Type = styled(FlexBox)(
    css({
      textTransform: 'uppercase',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'normal',
      border: '1px solid',
      marginRight: '10px',
      fontSize: 0,
      height: '22px',
      width: 'auto',
      padding: '0px 5px',
    })
  );

  return (
    <Card>
      <FlexBox my="20px" ml="20px" fontSize={2} fontWeight="bold">
        {name}
      </FlexBox>
      <Box mb="20px" borderBottom="1px solid lightGrey"></Box>
      <BouncyDiv>
        <FlexBox mb="30px" justifyContent="center">
          <img src={`/pokemon_images/${id}.png`} alt={name}></img>
        </FlexBox>
      </BouncyDiv>
      <FlexBox justifyContent="flex-end">
        {types.map((type, index) => (
          <Type
            bg={`light${type}`}
            borderColor={`${type}`}
            color={`${type}`}
            fontSize="2"
            key={id + index}
          >
            {type}
          </Type>
        ))}
      </FlexBox>
    </Card>
  );
};

export default PokemonCard;
