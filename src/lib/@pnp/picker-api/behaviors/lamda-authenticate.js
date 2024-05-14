export function LamdaAuthenticate(getToken) {
    return (instance) => {
        instance.on.authenticate(async function (command, result) {
            if (typeof result === "undefined") {
                try {
                    const accessToken = await getToken(command);
                    if (accessToken) {
                        this.log(`Returning token for auth type: '${command.type}'`, 0);
                        result = {
                            result: "token",
                            token: accessToken,
                        };
                    }
                }
                catch (e) {
                    this.error(e);
                }
            }
            return [command, result];
        });
        return instance;
    };
}
//# sourceMappingURL=lamda-authenticate.js.map