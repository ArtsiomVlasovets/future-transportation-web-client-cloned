import { UserDetails } from "./../../../core/models/user-details.model";
export class SignInAction {
  public static readonly type = "[CurrentUser] SignInAction";
  constructor(public payload: { username: string; password: string }) {}
}

export class SignUpAction {
  public static readonly type = "[CurrentUser] SignUpAction";
  constructor(
    public email: string,
    public password: string,
    public phone: string | null,
    public carrierMcNumber: string | null,
    public carrierId?: string | null,
    public uuid?: string | null
  ) {}
}

export class SignOutAction {
  public static readonly type = "[CurrentUser] SignOutAction";
}

export class LoadCurrentUserDetailsInfoAction {
  public static readonly type =
    "[CurrentUser] LoadCurrentUserDetailsInfoAction";
}

export class SetCurrentUserDetailsInfoAction {
  public static readonly type = "[CurrentUser] SetCurrentUserDetailsInfoAction";
  constructor(public userDetails: UserDetails) {}
}

export class GetUserInfoAction {
  public static readonly type = "[CurrentUser] GetUserInfoAction";
  constructor(public type: string, public uuid: string) {}
}
