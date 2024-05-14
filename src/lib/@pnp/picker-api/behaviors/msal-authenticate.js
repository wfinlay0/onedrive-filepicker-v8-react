import { combine } from "@pnp/core";
import { PublicClientApplication } from "@azure/msal-browser";
export function MSALAuthenticate(config, scopes) {
    const app = new PublicClientApplication(config);
    return (instance) => {
        instance.on.authenticate(async function (command, result) {
            if (typeof result === "undefined") {
                let accessToken;
                const authParams = { scopes: scopes || [`${combine(command.resource, ".default")}`] };
                try {
                    // see if we have already the idtoken saved
                    const resp = await app.acquireTokenSilent(authParams);
                    accessToken = resp.accessToken;
                }
                catch (e) {
                    // per examples we fall back to popup
                    const resp = await app.loginPopup(authParams);
                    if (resp.account) {
                        app.setActiveAccount(resp.account);
                    }
                    if (resp.idToken) {
                        const resp2 = await app.acquireTokenSilent(authParams);
                        accessToken = resp2.accessToken;
                    }
                    else {
                        this.error(e);
                    }
                }
                if (accessToken) {
                    this.log(`Returning token for auth type: '${command.type}'`, 0);
                    result = {
                        result: "token",
                        token: accessToken,
                    };
                }
            }
            return [command, result];
        });
        return instance;
    };
}
//# sourceMappingURL=msal-authenticate.js.map