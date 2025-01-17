// /src/utils/PrivateRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/login" />;
        }

        if (roles && roles.length > 0 && !roles.includes(user.role)) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
