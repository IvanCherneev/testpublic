import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser) {
          return <Redirect to={{
            pathname: "/login",
            state: {
              from: props.location,
            },
          }} />;
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;
