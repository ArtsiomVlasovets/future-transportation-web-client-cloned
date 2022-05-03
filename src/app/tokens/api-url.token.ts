import { environment } from "./../../environments/environment.prod";
import { InjectionToken } from "@angular/core";

export const API_URL: InjectionToken<string> = new InjectionToken<string>(
  "API URL",
  {
    providedIn: "root",
    factory: () => environment.apiUrl,
  }
);
