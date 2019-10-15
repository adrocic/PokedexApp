import { render } from './bootstrap/react';
import './bootstrap/axios';
import 'less/app';
import LoginScreen from 'screens/auth/login';
import RegistrationScreen from 'screens/auth/register';
import ResetPasswordScreen from 'screens/auth/reset-password';
import ForgotPasswordScreen from 'screens/auth/forgot-password';
import Navbar from 'components/navbar';
import PrivateRoute from 'utils/private-route';
import PublicRoute from 'utils/public-route';
import React from 'react';
import axios from 'axios';
import get from 'utils/get';
import { Layout, message } from 'antd';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { ROUTE_AFTER_AUTHENTICATION, UNAUTHENTICATED_ROUTE } from './constants';

const { Content, Header } = Layout;


class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentUser: window.currentUser || null
    };

    axios.interceptors.response.use(_ => _, error => {
      if (error.response.statusText === 'Unauthorized') {
        const wasAuthenticated = !!this.state.currentUser;
        if (wasAuthenticated) {
          this.setState({ currentUser: null, sessionExpired: wasAuthenticated });
        }
      }

      message.error(get(error, 'response.data.error.message') || 'Something went wrong. Please refresh and try again.');

      return Promise.reject(error);
    });

  }

  setUser = (currentUser) => {
    this.setState({ currentUser });
  }

  logout = () => {
    axios.post('/auth/logout')
      .then(() => {
        this.setUser(null);
      })
  }

  render () {
    const currentUser = this.state.currentUser;

    return (
      <Layout>
        <Navbar
          currentUser={currentUser}
          onLogoutClick={this.logout}
        />

        <Content>
          <Switch>
            <Redirect path='/' exact to='/login' />
            <PublicRoute path='/login' isAuthenticated={!!currentUser} render={() => (
              <LoginScreen onSuccess={this.setUser} />
            )}/>
            <PublicRoute path='/register' isAuthenticated={!!currentUser} render={() => (
              <RegistrationScreen onSuccess={this.setUser} />
            )}/>
            <PublicRoute path='/forgot-password' component={ForgotPasswordScreen}/>
            <PublicRoute path='/reset-password/:token' render={ ({match}) => (
              <ResetPasswordScreen token={match.params.token} onSuccess={this.setUser} />
            )}/>
            <PrivateRoute path='/dashboard' isAuthenticated={!!currentUser} render={() => (
              <div>You are authenticated!</div>
            )}/>
            <Route render={() => (
              <div>Not found</div>
            )}/>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

App = withRouter(App);

render(App);
