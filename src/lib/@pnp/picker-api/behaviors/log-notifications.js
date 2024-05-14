export function LogNotifications() {
    return (instance) => {
        instance.on.notification(async function (message) {
            this.log(`[${message.timestamp}] ${message.message}`, message.isExpected ? 0 : 1);
        });
        return instance;
    };
}
//# sourceMappingURL=log-notifications.js.map