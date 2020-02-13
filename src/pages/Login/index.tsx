import React from "react";
// Context
import { useAuth, IAuth } from "Context/Auth";

const Login = () => {
  const { loginRequest }: IAuth = useAuth();
  return (
    <div>
      <h1>Coucou</h1>
      <button onClick={loginRequest}>Login</button>
    </div>
  );
};

export default Login;
