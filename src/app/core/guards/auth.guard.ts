import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { CurrentUserState } from "../../shared/state/current-user/current-user.state";
import { NOTIFICATIONS } from "../constants";
import { HotToastService } from "@ngneat/hot-toast";
import { SignOutAction } from "../../shared/state/current-user/current-user.actions";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private notificationService: HotToastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUserIsAuthenticated: boolean = this.store.selectSnapshot(
      CurrentUserState.getCurrentUserIsAuthenticated
    );

    console.log("currentUserIsAuthenticated :>> ", currentUserIsAuthenticated);

    if (!currentUserIsAuthenticated) {
      this.notificationService.warning(NOTIFICATIONS.NotAuthanticated);

      this.store.dispatch(new SignOutAction());
      return false;
    }
    return true;
  }
}
