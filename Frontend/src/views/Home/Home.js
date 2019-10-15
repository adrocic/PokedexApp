import React from 'react';
import { Link } from 'react-router-dom';

import FlexBox from '../../components/FlexBox';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Text from '../../components/Text';
import { useAuth } from '../../components/AuthContext';

function Home() {
  const auth = useAuth();
  /* The component below is a flexbox layout component built using `styled-system` */

  return (
    <Page>
      <FlexBox col alignItems="center" p={4} py={5}>
        {auth.isLoggedIn ? (
          <>
            <Button mt={30} mb={3} onClick={auth.logout} data-cy="logout">
              Logout
            </Button>
            <Text color="white">{`Logged in! (token: ${auth.token})`}</Text>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button mt={30} mb={2} data-cy="login">
                Login
              </Button>
            </Link>
          </>
        )}
      </FlexBox>
    </Page>
  );
}
Home.propTypes = {};

export default Home;
