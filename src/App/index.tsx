import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
// UI Components
import CssBaseline from "@material-ui/core/CssBaseline";
// Components
import Dashboard from "pages/Dashboard";
import Layout from "components/Layout";
// Context
import { useAuth } from "context/auth";
import { CurrentProjectProvider } from "context/currentProject";
import { ThemeProvider } from "context/theme";

const App = () => {
  const { isAuthInitialized, isAuthenticated } = useAuth();

  if (!isAuthInitialized) {
    return <div>Initialization...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider>
        <CurrentProjectProvider>
          <Layout>
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Layout>
        </CurrentProjectProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
