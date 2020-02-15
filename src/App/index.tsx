import React from "react";
import { Switch, Route } from "react-router-dom";
// Components
import Dashboard from "pages/Dashboard";
// Context
import { useAuth, IAuth } from "Context/Auth";

const App = () => {
  const { isAuthInitialized, isAuthenticated }: IAuth = useAuth();

  if (!isAuthInitialized) {
    return <div>Initialization...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Switch>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default App;
