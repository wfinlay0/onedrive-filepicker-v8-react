import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig.ts";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";
import { IAuthenticateCommand } from "./lib/@pnp/picker-api/dist/types";
import { combine } from "@pnp/core";

export const msalInstance = new PublicClientApplication(msalConfig);

export async function getToken(command: IAuthenticateCommand): Promise<string> {
  return getTokenWithScopes([`${combine(command.resource, ".default")}`]);
}

export async function getTokenWithScopes(
  scopes: string[],
  additionalAuthParams?: Omit<SilentRequest, "scopes">
): Promise<string> {
  let accessToken = "";
  const authParams = { scopes, ...additionalAuthParams };

  try {
    // see if we have already the idtoken saved
    const resp = await msalInstance.acquireTokenSilent(authParams!);
    accessToken = resp.accessToken;
  } catch (e) {
    // per examples we fall back to popup
    const resp = await msalInstance.loginPopup(authParams!);
    msalInstance.setActiveAccount(resp.account);

    if (resp.idToken) {
      const resp2 = await msalInstance.acquireTokenSilent(authParams!);
      accessToken = resp2.accessToken;
    } else {
      // throw the error that brought us here
      throw e;
    }
  }

  return accessToken;
}

msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>
  );
});
