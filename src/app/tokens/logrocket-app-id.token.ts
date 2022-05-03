import {InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';

export const LOGROCKET_APP_ID = new InjectionToken<string | null>('LogrocketAppIdToken', {
  providedIn: 'root',
  factory: () => environment.logRocketAppId
});
