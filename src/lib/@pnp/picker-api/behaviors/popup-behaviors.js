import { LogNotifications } from "./log-notifications.js";
import { ResolveWithPicks } from "./resolves.js";
import { Setup } from "./setup.js";
export function Close() {
    return (instance) => {
        instance.on.close(function () {
            this.emit[this.InternalResolveEvent](null);
            this.window.close();
        });
        return instance;
    };
}
export function CloseOnPick() {
    return (instance) => {
        instance.on.pick(async function (data) {
            this.window.close();
        });
        return instance;
    };
}
export function Popup() {
    return (instance) => {
        instance.using(Setup(), Close(), LogNotifications(), ResolveWithPicks(), CloseOnPick());
        return instance;
    };
}
//# sourceMappingURL=popup-behaviors.js.map