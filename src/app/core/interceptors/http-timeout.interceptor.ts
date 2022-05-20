import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {timeoutWith} from 'rxjs/operators';

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {
  private readonly timeout: number = 15000;
  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      timeoutWith(this.timeout, throwError(`Request timed out! URL: ${request.urlWithParams}`))
    );
  }
}
