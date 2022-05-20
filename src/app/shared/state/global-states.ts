import { StateClass } from "@ngxs/store/internals";
import { ZonesState } from "./zones/zones.state";
import { CurrentUserState } from "./current-user/current-user.state";

export const GLOBAL_STATES: StateClass[] = [ZonesState, CurrentUserState];
