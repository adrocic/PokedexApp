import React from 'react';
import PropTypes from 'prop-types';

import FlexBox from '../FlexBox';
import Box from '../Box';

const Page = ({ children, ...props }) => (
  <FlexBox col pt={5} {...props}>
    <Box alignSelf="center">
      <Box mx="auto" borderRadius="normal">
        {children}
      </Box>
    </Box>
  </FlexBox>
);
Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
