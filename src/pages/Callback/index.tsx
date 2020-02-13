import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth, IAuth } from "Context/Auth";

const Callback = () => {
  const location = useLocation();
  const { authenticateUser }: IAuth = useAuth();

  useEffect((): void => {
    authenticateUser(location.hash);
  }, [location, authenticateUser]);

  return <div>Loading...</div>;
};

export default Callback;
