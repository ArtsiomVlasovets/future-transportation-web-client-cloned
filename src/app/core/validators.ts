import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

export class CustomValidators {
  static readonly URL_PATTERN: RegExp = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  static readonly minAllowedYear: number = 1900;
  static readonly currentYearUTC: number = new Date().getUTCFullYear();

  static URLFormatValidator(): ValidatorFn {
    return this.pattern({
      pattern: CustomValidators.URL_PATTERN,
      message: "Wrong URL format",
    });
  }

  static restrictedCharactersPattern(
    restrictedCharacters: Array<string>
  ): ValidatorFn {
    const regex: RegExp = new RegExp(`^[^${restrictedCharacters.join("")}]+$`);
    return this.pattern({
      pattern: regex,
      message: `${restrictedCharacters.join(" ")} characters are not allowed.`,
    });
  }

  static pattern(config: { pattern: RegExp; message: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regExp: RegExp = config.pattern;
      if (control.value && !control.value.match(regExp)) {
        return {
          customPattern: {
            pattern: config.pattern,
            message: config.message,
          },
        };
      }
      return null;
    };
  }

  static positiveInteger(numbersAmountLimit: number): ValidatorFn {
    const maxNumbersString: string = new Array(numbersAmountLimit)
      .fill(9)
      .join("");
    const maximumNumberValue: number = Number(maxNumbersString);
    return Validators.compose([
      Validators.min(0),
      Validators.max(maximumNumberValue),
    ]) as ValidatorFn;
  }

  static shouldMatch(
    controlName: string,
    matchingControlName: string,
    message: string = "Should match"
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = (formGroup as FormGroup).controls[controlName];
      const matchingControl = (formGroup as FormGroup).controls[
        matchingControlName
      ];

      if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({
          mustMatch: {
            message,
          },
        });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

  static atLeastOneHasValue(
    controlsNames: Array<string>,
    valueToCompare: any = true
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const atLeastOneControlHasValue: boolean = controlsNames.some(
        (controlName: string) => {
          return (
            (control as FormGroup).get(controlName)?.value === valueToCompare
          );
        }
      );
      if (atLeastOneControlHasValue) {
        return null;
      }
      return {
        atLeastOneHasValue: true,
      };
    };
  }
}
