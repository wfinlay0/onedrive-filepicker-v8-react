export function RejectOnErrors() {
    return (instance) => {
        instance.on.error(function (err) {
            this.emit[this.InternalRejectEvent](err || null);
        });
        return instance;
    };
}
//# sourceMappingURL=errors.js.map