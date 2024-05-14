import { _Picker } from "./picker.js";
export * from "./behaviors/popup-behaviors.js";
export * from "./behaviors/setup.js";
export * from "./behaviors/msal-authenticate.js";
export * from "./behaviors/lamda-authenticate.js";
export * from "./behaviors/resolves.js";
export * from "./behaviors/errors.js";
export * from "./behaviors/embed-behaviors.js";
export * from "./behaviors/log-notifications.js";
export function Picker(window) {
    if (typeof window === "undefined") {
        throw Error("You must supply a valid Window for the picker to render within.");
    }
    return new _Picker(window);
}
//# sourceMappingURL=index.js.map