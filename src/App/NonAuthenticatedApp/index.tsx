import React from "react";
import { Switch, Route } from "react-router-dom";
// Pages
import Login from "pages/Login";
import Callback from "pages/Callback";

const NonAuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/auth/gitlab/callback">
        <Callback />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
};

export default NonAuthenticatedApp;
