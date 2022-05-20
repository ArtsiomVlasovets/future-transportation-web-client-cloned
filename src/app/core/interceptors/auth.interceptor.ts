import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Store } from "@ngxs/store";
import { CurrentUserState } from "../../shared/state/current-user/current-user.state";
import { EMPTY_STRING, NOTIFICATIONS } from "../constants";
import { HotToastService } from "@ngneat/hot-toast";
import { catchError } from "rxjs/operators";
import { SignOutAction } from "../../shared/state/current-user/current-user.actions";
import { HeaderName } from "../models/header-name.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private notificationService: HotToastService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUserIsAuthenticated: boolean = this.store.selectSnapshot(
      CurrentUserState.getCurrentUserIsAuthenticated
    );
    if (currentUserIsAuthenticated) {
      request = request.clone({
        setHeaders: {
          [HeaderName.Auth]:
            this.store.selectSnapshot(CurrentUserState.getAuthToken) ||
            EMPTY_STRING,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse | string) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.Unauthorized &&
          /* Select fresh value - store can be updated by first failed request if multiple requests are failing synchronously*/
          this.store.selectSnapshot(
            CurrentUserState.getCurrentUserIsAuthenticated
          )
        ) {
          this.notificationService.warning(NOTIFICATIONS.SessionExpired, {
            id: "session-expired",
          });
          this.store.dispatch(new SignOutAction());
        }
        return throwError(error);
      })
    );
  }
}
