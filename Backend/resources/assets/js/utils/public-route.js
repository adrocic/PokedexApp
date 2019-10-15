import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTE_AFTER_AUTHENTICATION } from '../constants';

export default function ({ component: Component, isAuthenticated, render, ...rest }) {
  return <Route {...rest} render={props => (
    isAuthenticated ? (
      <Redirect from={rest.path} to={ROUTE_AFTER_AUTHENTICATION} />
    ) : (
      Component ?
        <Component {...props}/>
        :
        render(props)
    )
  )}/>;
}
