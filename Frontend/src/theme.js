/* This theme file can be used to create consistent spacing, colors, and fonts across the app.
   See the `styled-system` theme documentation for more information on the format.

   For more information on how to use the theme file see: https://styled-system.com/theme-specification
*/
import { pipe } from 'ramda';

const addAlias = (alias, index) => scale => {
  scale[alias] = scale[index];
  return scale;
};

const theme = {
  colors: {
    primary: '#f2bc23',
    neutral: 'wheat',
    white: '#fffefc',
    lightestGrey: 'hsl(0, 0%, 95%)',
    lighterGrey: 'hsl(0, 0%, 80%)',
    lightGrey: 'hsl(0, 0%, 65%)',
    grey: 'hsl(0, 0%, 50%)',
    darkGrey: 'hsl(0, 0%, 35%)',
    darkerGrey: 'hsl(0, 0%, 20%)',
    black: 'hsl(0, 0%, 10%)',
    green: 'rgb(85, 166, 156)',
    lightGreen: 'rgba(85, 166, 156, 0.6)',
    transparent: 'rgba(50, 50, 50, 0)',
    almostTransparent: 'rgba(50, 50, 50, 0.05)',
    lessTransparent: 'rgba(50, 50, 50, .1)',
    leastTransparent: 'rgba(50, 50, 50, .8)',
    poison: 'rgba(154, 82, 255, 1)',
    lightpoison: 'rgba(154, 82, 255, .05)',
    psychic: 'rgba(209, 82, 255, 1)',
    lightpsychic: 'rgb(209, 82, 255, .05)',
    fairy: 'rgba(209, 82, 135, 1)',
    lightfairy: 'rgba(209, 82, 135, 0.05)',
    flying: 'rgba(148, 197, 219, 1)',
    lightflying: 'rgba(148, 197, 219, 0.05)',
    ground: 'rgba(168, 132, 84, 1)',
    lightground: 'rgba(168, 132, 84, 0.05)',
    steel: 'rgba(103, 122, 131, 1)',
    lightsteel: 'rgba(103, 122, 131, .05)',
    dragon: 'rgba(83, 82, 121, 1)',
    lightdragon: 'rgba(83, 82, 121, .05)',
    fighting: 'rgba(156, 54, 54, 1)',
    lightfighting: 'rgba(156, 54, 54, 0.05)',
    ghost: 'rgba(53, 52, 102, 1)',
    lightghost: 'rgba(53, 52, 102, 0.05)',
    ice: 'rgba(23, 219, 219, 1)',
    lightice: 'rgba(23, 219, 219, 0.05)',
    water: 'rgba(37, 164, 238, 1)',
    lightwater: 'rgba(37, 164, 238, 0.05)',
    bug: 'rgba(144, 160, 85, 1)',
    lightbug: 'rgba(144, 160, 85, 0.05)',
    electric: 'rgba(219, 192, 35, 1)',
    lightelectric: 'rgba(219, 192, 35, 0.05)',
    fire: 'rgba(226, 17, 17, 1)',
    lightfire: 'rgba(226, 17, 17, 0.05)',
    normal: 'rgba(158, 139, 126, 1)',
    lightnormal: 'rgba(158, 139, 126, 0.05)',
    rock: 'rgba(128, 81, 52, 1)',
    lightrock: 'rgba(128, 81, 52, 0.05)',
    grass: 'rgba(48, 191, 69, 1)',
    lightgrass: 'rgba(48, 191, 69, 0.05)',
    dark: 'rgba(49, 46, 51, 1)',
    lightdark: 'rgba(49, 46, 51, 0.05)',
  },
  radii: {
    normal: 3,
    circle: '50%',
  },
  sizes: {
    field: 32,
    page: 1280,
    0: 0,
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
    8: 256,
    9: 512,
    10: 1024,
  },
  fontSizes: pipe(
    addAlias('body', 2),
    addAlias('header', 5)
  )([12, 14, 16, 20, 24, 32, 48, 64]),
  /*
    Uncomment this to modify the scale. The scale below is default already.
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512]

    To use the scale, provide the index of the desired value to style props on a `styled-system` component.
    e.x.:
    ```
    <Box padding={2}></Box>
    ```
    This results in 8px of padding being applied to the Box because 8 is at index 2 of the scale array.

    For more information see: https://styled-system.com/theme-specification#space
    */
};

export default theme;
