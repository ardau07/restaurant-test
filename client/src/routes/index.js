import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
import LoginPage from '../pages/auth/Login';
import SignupPage from '../pages/auth/Signup';
import HomePage from '../pages/main/Home';
import RestaurantsList from '../pages/restaurant/RestaurantsList';
import RestaurantDetails from '../pages/restaurant/RestaurantDetails';

import { getProfile } from 'src/store/actions/auth';

function Routes() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.user);

  const getAccount = useCallback(async () => {
    setLoading(true);
    await dispatch(getProfile());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      getAccount();
    }
  }, [getAccount]);

  return loading ? (
    <Loader />
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn) return <Redirect to="/home" />;
          return <Redirect to="/login" />;
        }}
      />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      {isLoggedIn && (
        <Layout>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/restaurants" component={RestaurantsList} />
            <Route exact path="/restaurants/:restaurantId" component={RestaurantDetails} />
          </Switch>
        </Layout>
      )}
    </Switch>
  );
}

export default Routes;
