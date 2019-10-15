import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import 'normalize.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* This theme file can be used to create consistent spacing, colors, and fonts across the app.
   See the `styled-system` theme documentation for more information on the format.
 */
import theme from './theme';
import Home from './views/Home';
import Login from './views/Login';
import Pokedex from './views/Pokedex';
import PokemonDetail from './views/PokemonDetail';
import GlobalStyles from './GlobalStyles';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/pokedex" component={Pokedex} />
            <PrivateRoute path="/:id" component={PokemonDetail} />
          </Switch>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
