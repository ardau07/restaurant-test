import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <CircularProgress size={72} color="primary" />
    </Box>
  );
};

export default Loader;
