import React from "react";
// Components
import AuthenticatedApp from "./AuthenticatedApp";
import NonAuthenticatedApp from "./NonAuthenticatedApp";
// Context
import { useAuth, IAuth } from "Context/Auth";

const App = () => {
  const { isAuthenticated }: IAuth = useAuth();

  return isAuthenticated ? <AuthenticatedApp /> : <NonAuthenticatedApp />;
};

export default App;
