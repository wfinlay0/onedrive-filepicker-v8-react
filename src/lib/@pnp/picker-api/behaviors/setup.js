export function Setup() {
    return (instance) => {
        instance.on.init(function () {
            window.addEventListener("message", (event) => {
                if (event.source && event.source === this.window) {
                    const message = event.data;
                    if (message.type === "initialize" && message.channelId === this.options.messaging.channelId) {
                        this.port = event.ports[0];
                        this.port.addEventListener("message", (event) => Reflect.apply(this.messageListener, this, [event]));
                        this.port.start();
                        this.port.postMessage({
                            type: "activate",
                        });
                    }
                }
            });
        });
        instance.on.dispose(function () {
            if (this.port) {
                this.port.close();
            }
        });
        return instance;
    };
}
//# sourceMappingURL=setup.js.map