import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import App from "./App";

const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.render(
  <React.StrictMode>
      <App pca={msalInstance}/>
  </React.StrictMode>,
  document.getElementById("root")
);

