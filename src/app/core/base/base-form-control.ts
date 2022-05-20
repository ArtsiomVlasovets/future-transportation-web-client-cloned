import {ChangeDetectorRef, Directive, OnInit} from '@angular/core';
import {BaseUnsubscribe} from './base-unsubscribe';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({})
export abstract class BaseFormControl<T> extends BaseUnsubscribe implements OnInit, ControlValueAccessor, Validator {
  onTouched = () => {
  };
  onChange = (event: T) => {
  };

  get control(): AbstractControl | null {
    return this.ngControl?.control;
  }

  get errorIsVisible(): boolean {
    return !!this.control?.touched && !!this.control?.errors;
  }

  constructor(protected ngControl: NgControl,
              protected cdr: ChangeDetectorRef) {
    super();
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.registerIntegratedValidator();
    this.markForCheckOnTouchChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected markForCheckOnTouchChanges(): void {
    if (this.control) {
      const origFunc = this.control.markAsTouched;
      this.control.markAsTouched = (...params) => {
        origFunc.apply(this.control, params);
        this.cdr.markForCheck();
      };
    }
  }

  protected registerIntegratedValidator(): void {
    const validators: ValidatorFn[] = [this.validate.bind(this)];
    if (this.ngControl.control?.validator) {
      validators.push(this.ngControl.control?.validator);
    }
    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }

  abstract setDisabledState(isDisabled: boolean): void;

  abstract writeValue(value: any): void;

  abstract validate(control: AbstractControl): ValidationErrors | null;
}
