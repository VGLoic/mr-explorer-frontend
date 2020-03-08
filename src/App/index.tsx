import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
// UI Components
import CssBaseline from "@material-ui/core/CssBaseline";
// Components
import Dashboard from "pages/Dashboard";
import Layout from "components/Layout";
// Context
import { useAuth, IAuth } from "context/auth";

const App = () => {
  const { isAuthInitialized, isAuthenticated }: IAuth = useAuth();

  if (!isAuthInitialized) {
    return <div>Initialization...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
};

export default App;
