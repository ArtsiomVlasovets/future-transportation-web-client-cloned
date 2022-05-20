import {Injectable} from '@angular/core';
import {
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {HotToastService} from '@ngneat/hot-toast';
import {catchError} from 'rxjs/operators';
import {getMessageFromHttpError} from '../utils/http.utils';

const SKIP_GENERIC_ERROR_NOTIFICATION = new HttpContextToken<boolean>(() => false);

export function skipGenericErrorNotification(): HttpContext {
  return new HttpContext().set(SKIP_GENERIC_ERROR_NOTIFICATION, true);
}

@Injectable()
export class HttpErrorLoggerInterceptor implements HttpInterceptor {
  private readonly skipNotificationForStatusCodes: Array<HttpStatusCode> = [HttpStatusCode.Unauthorized];

  constructor(private notificationsService: HotToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse | string) => {
        /* Should skip generic error notification for specific status codes, since they have custom handlers */
        if (error instanceof HttpErrorResponse
          && (this.skipNotificationForStatusCodes.includes(error.status) || request.context.get(SKIP_GENERIC_ERROR_NOTIFICATION))
        ) {
          return throwError(error);
        }
        const errorMessage: string = getMessageFromHttpError(error);
        this.notificationsService.error(errorMessage, {
          duration: 15000,
          position: 'bottom-right'
        });
        return throwError(error);
      })
    );
  }
}
