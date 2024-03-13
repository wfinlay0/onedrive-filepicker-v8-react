export const msalConfig = {
  auth: {
    clientId: import.meta.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.TENANT_ID}`,
    redirectUri: "http://localhost:3000",
  },
};
