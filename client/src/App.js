import React, { useEffect } from "react";

import { Route, Switch, useLocation, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from "./components/private-route";

import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Data from './pages/data'

import { clearErrors } from './actions/auth'

function App() {
  const dispatch = useDispatch();

  let location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(clearErrors());
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />}
      </Route>
      <PrivateRoute path="/:data(dashboard|create-profile)" component={Data} />
    </Switch>
  );
}

export default App;
