import { TimelinePipe } from "@pnp/core";
import { Configuration } from "@azure/msal-browser";
import { _Picker } from "../picker.js";
export declare function MSALAuthenticate(config: Configuration, scopes?: string[]): TimelinePipe<_Picker>;
