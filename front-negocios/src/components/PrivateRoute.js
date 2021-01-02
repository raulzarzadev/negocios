import React from "react";
import { useUser } from "../context/userContext";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isLogged } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/ingresa" />
      }
    />
  );
}
