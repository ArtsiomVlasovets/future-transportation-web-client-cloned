import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ZonesComponent } from "./api-url.interceptor";
import { CacheInterceptor } from "./cache.interceptor";
import { HttpTimeoutInterceptor } from "./http-timeout.interceptor";
import { HttpErrorLoggerInterceptor } from "./http-error-logger.interceptor";
import { AuthInterceptor } from "./auth.interceptor";

export const INTERCEPTORS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ZonesComponent,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorLoggerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTimeoutInterceptor,
    multi: true,
  },
];
