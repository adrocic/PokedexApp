import styled from '@emotion/styled';
import css from '@styled-system/css';
import {
  space,
  color,
  layout,
  flexbox,
  // When `styled-system` v5 types come out, this will not be necessary.
  // See: https://www.npmjs.com/package/@types/styled-system
  // @ts-ignore
} from 'styled-system';

const Button = styled('button')(
  css({
    display: 'flex',
    outline: 'none',
    textAlign: 'center',
    justifyContent: 'center',
    bg: 'grey',
    height: 'field',
    borderRadius: 'normal',
    borderWidth: 0,
    textTransform: 'uppercase',
    fontSize: 1,
    color: 'white',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': css({
      boxShadow: '0px 0px 10px 0px rgb(0, 0, 0, .75);',
      transform: 'translate(0px, -1px)',
    }),
    ':active': css({
      boxShadow: '0 0px',
      transform: 'translate(0px, 3px)',
    }),
  }),
  color,
  space,
  layout,
  flexbox
);

export default Button;
