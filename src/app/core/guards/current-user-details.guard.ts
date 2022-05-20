import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { CurrentUserState } from "../../shared/state/current-user/current-user.state";
import { LoadCurrentUserDetailsInfoAction } from "../../shared/state/current-user/current-user.actions";
import { take } from "rxjs/operators";
import { UserDetails } from "../models/user-details.model";

@Injectable({
  providedIn: "root",
})
export class CurrentUserDetailsGuard implements CanActivate {
  constructor(
    private store: Store // private analyticsService: AnalyticsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUserHasDetailsInfo: boolean = this.store.selectSnapshot(
      CurrentUserState.getCurrentUserHasDetailsInfo
    );
    const currentUserId: string | null = this.store.selectSnapshot(
      CurrentUserState.getUserId
    );
    if (!currentUserHasDetailsInfo && currentUserId) {
      this.store.dispatch(new LoadCurrentUserDetailsInfoAction());
    } else {
      this.trackUserIdentificationAnalyticsEvent();
    }
    return true;
  }

  private trackUserIdentificationAnalyticsEvent() {
    const userId: string = this.store.selectSnapshot(
      CurrentUserState.getUserId
    ) as string;
    const userDetails: UserDetails = this.store.selectSnapshot(
      CurrentUserState.getUserDetails
    ) as UserDetails;
    // this.analyticsService.identifyUser(userId, userDetails);
  }
}
