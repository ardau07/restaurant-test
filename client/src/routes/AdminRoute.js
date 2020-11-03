import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ROLES from 'src/constants/roles';

const AdminRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isLoggedIn = useSelector((state) => !!state.auth.user);
  const profile = useSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) return <Redirect to="/login" />;
        if (profile.role === ROLES.ADMIN) return <Component {...props} />;
        return <Redirect to="/404" />;
      }}
    />
  );
};

export default AdminRoute;
