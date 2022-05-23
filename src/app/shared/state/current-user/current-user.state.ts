import { RouteQueryParamName } from "./../../../core/models/route-query-param-name.enum";
import { SignInResponse } from "./../../../core/models/responses/sign-in.response";
import { UserDetails } from "./../../../core/models/user-details.model";
import { AuthHttpService } from "./../../../core/service/http/auth-http.service";
import {
  Action,
  Actions,
  ofAction,
  Selector,
  State,
  StateContext,
} from "@ngxs/store";
import {
  GetUserInfoAction,
  LoadCurrentUserDetailsInfoAction,
  SetCurrentUserDetailsInfoAction,
  SignInAction,
  SignOutAction,
  SignUpAction,
} from "./current-user.actions";
import { Injectable } from "@angular/core";
import { catchError, finalize, map, takeUntil, tap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { ABSOLUTE_ROUTES_URLS, NOTIFICATIONS } from "../../../core/constants";
import { Navigate, RouterCancel } from "@ngxs/router-plugin";
// import { AnalyticsService } from "../../../core/services/analytics.service";
import { throwError } from "rxjs";
import { HotToastService } from "@ngneat/hot-toast";

export interface CurrentUserStateModel {
  userId: string | null;
  authToken: string | null;
  userDetails: UserDetails | null;
  signInIsLoading: boolean;
  signUpIsLoading: boolean;
  getCurrentUserDetailsIsLoading: boolean;
  isUserInit: boolean;
  type: string;
  userInfo: {
    companyType: string;
    email: string;
    error?: unknown;
  };
}

const initialState: CurrentUserStateModel = {
  userId: null,
  authToken: null,
  userDetails: null,
  signInIsLoading: false,
  signUpIsLoading: false,
  getCurrentUserDetailsIsLoading: false,
  isUserInit: false,
  type: "",
  userInfo: {
    companyType: "",
    email: "",
  },
};

@Injectable()
@State<CurrentUserStateModel>({
  name: "currentUser",
  defaults: initialState,
})
export class CurrentUserState {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actions$: Actions,
    // private analyticsService: AnalyticsService,
    private authHttpService: AuthHttpService,
    private notificationsService: HotToastService
  ) {}

  @Selector()
  public static getCurrentUserIsAuthenticated(
    state: CurrentUserStateModel
  ): boolean {
    // return !!state.authToken && !!state.userId;

    return !!state.authToken && !!state.userDetails?.name;
  }

  @Selector()
  public static getCurrentUserHasDetailsInfo(
    state: CurrentUserStateModel
  ): boolean {
    return !!state.userDetails;
  }

  @Selector()
  public static getSignInIsLoading(state: CurrentUserStateModel): boolean {
    return state.signInIsLoading;
  }

  @Selector()
  public static getSignUpIsLoading(state: CurrentUserStateModel): boolean {
    return state.signUpIsLoading;
  }

  @Selector()
  public static getAuthToken(state: CurrentUserStateModel): string | null {
    return state.authToken;
  }

  @Selector()
  public static getUserId(state: CurrentUserStateModel): string | null {
    // return state.userId;

    return state.userDetails?.name as string | null;
  }

  /* User details fetching asynchronously during page reload */
  @Selector()
  public static getUserCarrierId(state: CurrentUserStateModel): string | null {
    return state.userDetails?.CarrierID || null;
  }

  @Selector()
  public static getUserSignRequired(
    state: CurrentUserStateModel
  ): boolean | null {
    return state.userDetails?.isSignRequired || null;
  }

  @Selector()
  public static getUserDetails(
    state: CurrentUserStateModel
  ): UserDetails | null {
    return state.userDetails;
  }

  @Selector()
  public static getUserDetailsLoading(state: CurrentUserStateModel): boolean {
    return state.getCurrentUserDetailsIsLoading;
  }

  @Selector()
  public static isUserInit(state: CurrentUserStateModel): boolean {
    return state.isUserInit;
  }

  @Selector()
  public static getuserInfo(state: CurrentUserStateModel): {
    companyType: string;
    email: string;
  } {
    return state.userInfo;
  }

  @Selector()
  public static getUserType(state: CurrentUserStateModel): string {
    return state.type;
  }

  @Action(SignInAction)
  public SignInAction(
    ctx: StateContext<CurrentUserStateModel>,
    { payload }: SignInAction
  ) {
    ctx.patchState({ signInIsLoading: true, isUserInit: true });

    return this.authHttpService.signIn(payload.username, payload.password).pipe(
      tap((response: SignInResponse) => {
        ctx.patchState({
          authToken: `${response.token_type} ${response.access_token}`,
          userDetails: { name: response.username },
          isUserInit: true,
        });

        ctx.dispatch(new Navigate(["/"]));
      }),
      finalize(() => ctx.patchState({ signInIsLoading: false }))
    );
  }

  @Action(SignUpAction)
  public SignUpAction(
    ctx: StateContext<CurrentUserStateModel>,
    action: SignUpAction
  ) {
    ctx.patchState({ signUpIsLoading: true, isUserInit: true });

    return this.authHttpService
      .signUp(
        action.email,
        action.password,
        action.phone,
        action.carrierMcNumber,
        action.carrierId,
        action.uuid
      )
      .pipe(
        tap((response) => {
          const message = response?.Message ?? NOTIFICATIONS.SignUpSuccess;
          this.notificationsService.success(message);
          const redirectUrl: any[] = ABSOLUTE_ROUTES_URLS.SignIn;
          setTimeout(() => {
            ctx.dispatch(new Navigate(redirectUrl));
          }, 1500);
        }),
        finalize(() => ctx.patchState({ signUpIsLoading: false }))
      );
  }

  @Action(LoadCurrentUserDetailsInfoAction)
  public LoadCurrentUserDetailsInfoAction(
    ctx: StateContext<CurrentUserStateModel>
  ) {
    ctx.patchState({ getCurrentUserDetailsIsLoading: true, isUserInit: true });

    const currentUserId: string | null = ctx.getState().userId;
    if (!currentUserId) {
      throw new Error(
        "currentUserId is not available in LoadCurrentUserDetailsInfoAction"
      );
    }

    return this.authHttpService.getUserDetails(currentUserId).pipe(
      map((userDetails: UserDetails) =>
        ctx.dispatch(new SetCurrentUserDetailsInfoAction(userDetails))
      ),
      finalize(() => ctx.patchState({ getCurrentUserDetailsIsLoading: false }))
    );
  }

  @Action(SetCurrentUserDetailsInfoAction)
  public SetCurrentUserDetailsInfoAction(
    ctx: StateContext<CurrentUserStateModel>,
    { userDetails }: SetCurrentUserDetailsInfoAction
  ) {
    // Can be removed when other companies will be added
    // if(userDetails.CompanyType !== 'carrier') {
    const redirectUrl: any[] = this.getAfterLoginRedirectUrl(
      userDetails.CompanyType as string
    );

    if (redirectUrl) {
      ctx.dispatch(new Navigate(redirectUrl));
    }
    // }

    ctx.patchState({
      userDetails: userDetails,
    });
    const currentUserId: string = ctx.getState().userId as string;
    // this.analyticsService.identifyUser(currentUserId, userDetails);
  }

  @Action(SignOutAction, { cancelUncompleted: true })
  public SignOutAction(ctx: StateContext<CurrentUserStateModel>) {
    return (
      ctx
        //   .dispatch(
        //     new Navigate(ABSOLUTE_ROUTES_URLS.SignIn, {
        //       [RouteQueryParamName.ReturnUrl]: this.router.url,
        //     })
        //   )

        .dispatch(new Navigate(["/auth"]))
        .pipe(
          tap(() => {
            ctx.setState(initialState);
          })
          // takeUntil(this.actions$.pipe(ofAction(RouterCancel)))
        )
    );
  }

  private getAfterLoginRedirectUrl(type: string): any {
    const returnUrl: string | null = this.route.snapshot.queryParamMap.get(
      RouteQueryParamName.ReturnUrl
    );

    // const currentUrl = this.router.url;

    return returnUrl || "/";
    /* Default after login URL */
  }

  @Action(GetUserInfoAction)
  public getUserInfo(
    ctx: StateContext<CurrentUserStateModel>,
    { type, uuid }: GetUserInfoAction
  ) {
    ctx.patchState({ signInIsLoading: true });
    return this.authHttpService.getUserInfo(type, uuid).pipe(
      catchError((response) => {
        ctx.patchState({
          userInfo: {
            ...ctx.getState().userInfo,
            error: response.error?.Error,
          },
        });

        return throwError(response.error);
      }),
      tap((userInfo) => {
        if (userInfo.Register) {
          ctx.patchState({
            userInfo: {
              ...ctx.getState().userInfo,
              companyType: type,
              email: userInfo.Email,
            },
          });
        } else {
          ctx.dispatch(new Navigate(ABSOLUTE_ROUTES_URLS.SignIn));
        }
      }),
      finalize(() => ctx.patchState({ signInIsLoading: false }))
    );
  }
}
