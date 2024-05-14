export function ResolveWithPicks() {
    return (instance) => {
        instance.on.pick(async function (data) {
            this.emit[this.InternalResolveEvent](data);
        });
        return instance;
    };
}
//# sourceMappingURL=resolves.js.map