import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route path="/home" component={() => <h4>Home Page</h4>} />
    </Switch>
  );
};

export default Routes;
