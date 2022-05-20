import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CustomValidators } from "../../../../core/validators";

@Component({
  selector: "ftwp-email-password-form",
  templateUrl: "./email-password-form.component.html",
  styleUrls: ["./email-password-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailPasswordFormComponent implements OnInit {
  hidePassword: boolean = true;
  hidePasswordConfirmation: boolean = true;

  @Input() form!: FormGroup;
  @Input() hasPasswordConfirmation: boolean = false;
  @Input() emailControlName!: string;
  @Input() passwordControlName!: string;
  @Input() passwordConfirmationControlName!: string;
  @Input() email = "";

  constructor() {}

  ngOnInit(): void {}

  public isEmailExist(): boolean {
    return Boolean(this.email);
  }
}
