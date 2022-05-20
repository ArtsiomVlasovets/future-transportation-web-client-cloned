import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'controlErrors',
})
export class ControlErrorsPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }
    const errorKey: string = Object.keys(errors)[0];
    const errorValue: any = errors[errorKey];
    return this.getErrorMessage(errorKey, errorValue);
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'customError':
      case 'customPattern':
      case 'mustMatch':
        return errorValue.message;
      case 'required':
        return 'Field is required';
      case 'minlength':
        return `Min length is ${errorValue.requiredLength}. Current: ${errorValue.actualLength}`;
      case 'maxlength':
        return `Max length exceded! ${errorValue.actualLength}/${errorValue.requiredLength}`;
      case 'mask':
        return `Format should be ${errorValue.requiredMask}`;
      case 'pattern':
        return `Wrong format!`;
      case 'email':
        return 'Wrong email format!';
      case 'min':
        return `Minimum allowed number is ${errorValue.min}. Actual value is ${errorValue.actual}`;
      case 'max':
        return `Maximum allowed number is ${errorValue.max}. Actual value is ${errorValue.actual}`;
      default:
        return errorKey;
    }
  }
}
