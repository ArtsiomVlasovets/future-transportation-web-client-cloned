import {InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';

export const API_URL: InjectionToken<string> = new InjectionToken<string>('API URL', {
  providedIn: 'root',
  factory: () => environment.apiUrl
});
