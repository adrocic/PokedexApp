import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UNAUTHENTICATED_ROUTE } from '../constants';

export default function ({ component: Component, isAuthenticated, render, ...rest }) {
  return <Route {...rest} render={props => (
    isAuthenticated ? (
      Component ?
        <Component {...props}/>
        :
        render(props)
    ) : (
      <Redirect {...rest} to={{
        pathname: UNAUTHENTICATED_ROUTE,
        state: { from: props.location }
      }}/>
    )
  )}/>;
}

