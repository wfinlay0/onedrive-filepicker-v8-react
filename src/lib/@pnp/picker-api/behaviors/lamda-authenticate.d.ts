import { TimelinePipe } from "@pnp/core";
import { _Picker } from "../picker.js";
import { IAuthenticateCommand } from "types.js";
export declare function LamdaAuthenticate(getToken: (command: IAuthenticateCommand) => Promise<string>): TimelinePipe<_Picker>;
