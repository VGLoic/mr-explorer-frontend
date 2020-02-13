import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// App
import App from "./App";
// Workers
import * as serviceWorker from "./serviceWorker";
// Context
import { AuthProvider } from "Context/Auth";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
