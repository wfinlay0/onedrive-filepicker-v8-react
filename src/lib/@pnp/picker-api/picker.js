import { Timeline, asyncReduce, broadcast, combine } from "@pnp/core";
const PickerMoments = {
    authenticate: asyncReduce(),
    pick: broadcast(),
    close: broadcast(),
    notification: broadcast(),
};
export class _Picker extends Timeline {
    /**
     * The window into which the picker will be rendered
     */
    constructor(window) {
        super(PickerMoments);
        this.window = window;
        this.InternalResolveEvent = Symbol.for("Picker_Resolve");
        this.InternalRejectEvent = Symbol.for("Picker_Reject");
    }
    async activate(params) {
        this.options = params.options;
        return this.start(params);
    }
    async messageListener(message) {
        switch (message.data.type) {
            case "notification":
                this.emit.notification(message.data);
                break;
            case "command":
                this.port.postMessage({
                    type: "acknowledge",
                    id: message.data.id,
                });
                const command = message.data.data;
                switch (command.command) {
                    case "authenticate":
                        const [, authResult] = await this.emit.authenticate(command, undefined);
                        if (typeof authResult !== "undefined") {
                            this.port.postMessage({
                                type: "result",
                                id: message.data.id,
                                data: authResult
                            });
                        }
                        break;
                    case "close":
                        this.emit.close();
                        this.port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success",
                            },
                        });
                        break;
                    case "pick":
                        await this.emit.pick(command);
                        this.port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success",
                            },
                        });
                        break;
                    default:
                        this.log(`Unsupported command: ${JSON.stringify(command)}`, 2);
                        // let the picker know we don't support whatever command it sent
                        this.port.postMessage({
                            result: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command
                            },
                            isExpected: true,
                        });
                        break;
                }
                break;
        }
    }
    execute(init) {
        const { baseUrl, pickerPathOverride } = {
            pickerPathOverride: "_layouts/15/FilePicker.aspx",
            ...init,
        };
        setTimeout(async () => {
            try {
                const [, authResult] = await this.emit.authenticate({
                    command: "authenticate",
                    type: "SharePoint",
                    resource: baseUrl,
                }, undefined);
                if (typeof authResult === "undefined") {
                    this.error(Error("Could not gain auth token in form setup."));
                }
                const authToken = authResult && authResult.token ? authResult.token : null;
                const queryString = new URLSearchParams({
                    filePicker: JSON.stringify(this.options),
                });
                const url = combine(baseUrl, `${pickerPathOverride}?${queryString}`);
                const form = this.window.document.createElement("form");
                form.setAttribute("action", url);
                form.setAttribute("method", "POST");
                this.window.document.body.append(form);
                if (authToken !== null) {
                    const input = this.window.document.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", "access_token");
                    input.setAttribute("value", authToken);
                    form.appendChild(input);
                }
                form.submit();
            }
            catch (e) {
                this.emit[this.InternalRejectEvent](e);
            }
        }, 0);
        return new Promise((resolve, reject) => {
            this.on[this.InternalResolveEvent].replace(resolve);
            this.on[this.InternalRejectEvent].replace(reject);
        });
    }
}
//# sourceMappingURL=picker.js.map