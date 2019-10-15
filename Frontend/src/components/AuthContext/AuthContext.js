/*
Component used to store the current authentication state of the user.
*/
import React from 'react';

import { handleTokenChange } from '../../services/API';

const AuthContext = React.createContext();

export const AuthProvider = props => {
  const [token, setToken] = React.useState(localStorage.getItem('auth_token'));

  React.useEffect(() => {
    // Update axios with the latest token each time it changes
    handleTokenChange(token);
  }, [token]);

  function onLogin(newToken) {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
  }

  function onLogout() {
    localStorage.removeItem('auth_token');
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: token ? true : false,
        login: onLogin,
        logout: onLogout,
      }}
      {...props}
    />
  );
};

/**
 * @returns Object: {
 *   token: string,
 *   isLoggedIn: bool,
 *   login: (token) => void,
 *   logout: () => void,
 * }
 */
export const useAuth = () => React.useContext(AuthContext);
