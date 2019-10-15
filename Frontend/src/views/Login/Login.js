import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import { withRouter, Redirect } from 'react-router-dom';
import css from '@styled-system/css';

import FlexBox from '../../components/FlexBox';
import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../components/AuthContext';

/*
An example of a text component. You would probably want to create a place to organize similar text related components.
An example being src/components/typography
*/
const Header = styled.h1(
  css({
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
  })
);

export const LoginForm = ({ onSubmit }) => (
  <Box minWidth={300} maxWidth={500}>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .required('Email is required')
          .email('Invalid email address'),
        password: yup.string().required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) =>
        onSubmit(values).finally(() => setSubmitting(false))
      }
    >
      {({ isSubmitting }) => (
        <Form>
          <FlexBox flexDirection="column">
            <Header>Login</Header>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoFocus
              data-cy="email"
            />
            <ErrorMessage name="email" component="div" />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              data-cy="password"
            />
            <ErrorMessage name="password" component="div" />

            <Button
              type="submit"
              disabled={isSubmitting}
              mt={3}
              alignSelf="flex-end"
              data-cy="submit"
            >
              Submit
            </Button>
          </FlexBox>
        </Form>
      )}
    </Formik>
  </Box>
);
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function LoginPage({ history }) {
  const auth = useAuth();
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="green"
    >
      {auth.isLoggedIn ? (
        <Redirect to={'/pokedex'} />
      ) : (
        <LoginForm
          onSubmit={values =>
            new Promise(resolve => {
              // You will want to actually make a network request here.
              setTimeout(() => {
                // Update the AuthContext to store the token.
                auth.login('my_fake_token');
                resolve();
              }, 300);
            })
          }
        />
      )}
    </FlexBox>
  );
}
LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(LoginPage);
