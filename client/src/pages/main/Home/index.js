import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const profile = useSelector((state) => state.auth.user);

  return (
    <Typography variant="h3">Welcome, {`${profile.firstName} ${profile.lastName}`}</Typography>
  );
}

export default Home;
