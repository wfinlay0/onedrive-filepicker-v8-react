import { Setup } from "./setup.js";
import { LogNotifications } from "./log-notifications.js";
export function Embed(onPick) {
    return (instance) => {
        instance.using(Setup(), LogNotifications());
        instance.on.pick(onPick);
        return instance;
    };
}
//# sourceMappingURL=embed-behaviors.js.map