import { RouteName } from "./../../../../core/models/route-name.enum";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { fadeInOutAnimation } from "../../../../core/animations";
import { Select, Store } from "@ngxs/store";
import { CurrentUserState } from "../../../../shared/state/current-user/current-user.state";
import { SignInAction } from "../../../../shared/state/current-user/current-user.actions";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BaseForm } from "../../../../core/base/base-form";
import { EMPTY_STRING } from "../../../../core/constants";
import { TextBoxComponent } from "@progress/kendo-angular-inputs";

@Component({
  selector: "ftwp-sign-in-page",
  templateUrl: "./sign-in-page.component.html",
  styleUrls: ["./sign-in-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()],
})
export class SignInPageComponent {
  // @Select(CurrentUserState.getSignInIsLoading) isLoading$!: Observable<boolean>;

  // readonly routeNames = RouteName;
  // readonly formControlsNames = {
  //   email: "email",
  //   password: "password",
  // };

  constructor(private store: Store) {
    // super();
  }

  get isValidForm(): boolean {
    return (
      this.form.controls["username"].valid &&
      this.form.controls["password"].valid
    );
  }

  // override ngOnInit(): void {
  //   super.ngOnInit();
  // }

  // onFormSubmit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  //   this.signIn(
  //     this.form.value[this.formControlsNames.email],
  //     this.form.value[this.formControlsNames.password]
  //   );
  // }

  // protected initFrom(): void {
  //   this.form = this.fb.group({
  //     [this.formControlsNames.email]: new FormControl(EMPTY_STRING, [
  //       Validators.required,
  //       Validators.email,
  //     ]),
  //     [this.formControlsNames.password]: new FormControl(EMPTY_STRING, [
  //       Validators.required,
  //       Validators.minLength(4),
  //     ]),
  //   });
  // }

  private signIn(username: string, password: string): void {
    this.store.dispatch(new SignInAction({ username, password }));
  }

  @ViewChild("password") public textbox!: TextBoxComponent;

  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === "password" ? "text" : "password";
  }

  public form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    loggedin: new FormControl(),
  });

  public login(): void {
    this.form.markAllAsTouched();

    if (!this.isValidForm) {
      return;
    }

    const username = this.form.controls["username"].value;
    const password = this.form.controls["password"].value;

    this.signIn(username, password);
  }

  public clearForm(): void {
    this.form.reset();
  }
}
