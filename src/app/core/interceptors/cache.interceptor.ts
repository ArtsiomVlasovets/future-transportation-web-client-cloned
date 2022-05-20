import {Injectable} from '@angular/core';
import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {filter, first, shareReplay, tap} from 'rxjs/operators';

const CACHE_IT = new HttpContextToken<boolean>(() => false);

export function cacheIt(): HttpContext {
  return new HttpContext().set(CACHE_IT, true);
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  /* Key - request url with params; Value - Http response */
  private cache: Map<string, Observable<HttpEvent<any>>> = new Map();

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== "GET") {
      return next.handle(request)
    }

    const cachedResponse: Observable<HttpEvent<any>> | undefined = this.cache.get(request.urlWithParams);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.context.get(CACHE_IT)) {
      const responseToCache$: Observable<HttpEvent<any>> = next.handle(request).pipe(
        // Filter since we are interested in caching the response only, not progress events
        filter((res) => res instanceof HttpResponse ),
        // Share replay will cache the response
        shareReplay(1),
      );
      this.cache.set(request.urlWithParams, responseToCache$)
      return responseToCache$;
    }

    return next.handle(request);
  }
}
