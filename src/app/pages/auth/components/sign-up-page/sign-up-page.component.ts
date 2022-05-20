import { RouteName } from "./../../../../core/models/route-name.enum";
import { RouteQueryParamName } from "./../../../../core/models/route-query-param-name.enum";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fadeInOutAnimation } from "../../../../core/animations";
import { EMPTY_STRING } from "../../../../core/constants";
import { BaseForm } from "../../../../core/base/base-form";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  GetUserInfoAction,
  SignUpAction,
} from "src/app/shared/state/current-user/current-user.actions";
import { Select, Store } from "@ngxs/store";
import { CurrentUserState } from "src/app/shared/state/current-user/current-user.state";
import { CustomValidators } from "src/app/core/validators";

@Component({
  selector: "ftwp-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()],
})
export class SignUpPageComponent extends BaseForm implements OnInit {
  emailFromRoute: string | null = this.route.snapshot.queryParamMap.get(
    RouteQueryParamName.Email
  );
  carrierId: string | null = this.route.snapshot.queryParamMap.get(
    RouteQueryParamName.CarrierId
  );

  readonly routeNames = RouteName;
  readonly phoneNumberMask: string = "000-000-0000";
  readonly phoneNumberPlaceholder: string = "123-456-7890";
  readonly tenOptionalNumbersMask: string = "9999999999";
  readonly formControlsNames = {
    email: "email",
    password: "password",
    passwordConfirmation: "passwordConfirmation",
    phone: "phone",
    carrierMcNumber: "carrierMcNumber",
  };

  public type = "";
  public uuid = "";
  public isParamsInit = false;
  public userInfo: { companyType: string; email: string; error?: unknown } = {
    companyType: "",
    email: "",
  };

  get carrierIdIsUnknown(): boolean {
    return this.carrierId === null;
  }

  @Select(CurrentUserState.getuserInfo)
  public userInfo$!: Observable<{ companyType: string; email: string }>;

  @Select(CurrentUserState.getSignInIsLoading) isLoading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.authTypeInit();
  }

  onFormSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.signUp();
  }

  protected initFrom(): void {
    this.form = this.fb.group({
      [this.formControlsNames.email]: new FormControl(
        this.emailFromRoute || this.userInfo?.email,
        [Validators.required, Validators.email]
      ),
      [this.formControlsNames.password]: new FormControl(EMPTY_STRING, [
        Validators.required,
        Validators.minLength(4),
      ]),
      [this.formControlsNames.passwordConfirmation]: new FormControl(
        EMPTY_STRING,
        [Validators.required, Validators.minLength(4)]
      ),
    });

    if (this.carrierIdIsUnknown && !this.userInfo?.companyType) {
      this.form.addControl(
        this.formControlsNames.phone,
        new FormControl(null, [Validators.required, Validators.maxLength(50)])
      );
      this.form.addControl(
        this.formControlsNames.carrierMcNumber,
        new FormControl(null, [Validators.maxLength(10)])
      );
    }

    this.addPasswordConfirmationValidation();
  }

  private addPasswordConfirmationValidation() {
    this.form.setValidators(
      CustomValidators.shouldMatch(
        this.formControlsNames.password,
        this.formControlsNames.passwordConfirmation,
        "Passwords should match"
      )
    );
    this.form.updateValueAndValidity();
  }

  private signUp(): void {
    const email: string = this.form.value[this.formControlsNames.email];
    const password: string = this.form.value[this.formControlsNames.password];
    const phone: string | null = this.form.value[this.formControlsNames.phone];
    const carrierMcNumber: string | null =
      this.form.value[this.formControlsNames.carrierMcNumber];
    const carrierId = this.carrierId;
    const uuid: string | null = this.uuid;
    this.store.dispatch(
      new SignUpAction(email, password, phone, carrierMcNumber, carrierId, uuid)
    );
  }

  private authTypeInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params["type"];
      this.uuid = params["uuid"];

      if (this.type && this.uuid) {
        this.store
          .dispatch(new GetUserInfoAction(this.type, this.uuid))
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(() => {
            const userInfo = this.store.selectSnapshot(
              CurrentUserState.getuserInfo
            );
            this.userInfo = {
              ...userInfo,
            };
            this.isParamsInit = true;
            super.ngOnInit();
            this.cdr.markForCheck();
          });
        return;
      }
      this.isParamsInit = true;
      super.ngOnInit();
      this.cdr.markForCheck();
    });
  }
}
