import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../tokens/api-url.token';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(@Inject(API_URL) private apiUrl: string) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clone = request.clone({url: this.apiUrl + request.url});
    return next.handle(clone);
  }
}
