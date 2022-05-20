import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseUnsubscribe } from "./base-unsubscribe";
import { fromEvent } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { UnsavedChanges } from "../models/unsaved-changes.model";

@Component({
  template: "",
})
export abstract class BaseForm
  extends BaseUnsubscribe
  implements OnInit, UnsavedChanges
{
  form!: FormGroup;
  abstract readonly formControlsNames: { [key: string]: string };

  protected abstract initFrom(): void;

  ngOnInit(): void {
    this.initFrom();
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  protected handleUnsavedChanges(
    message: string = "You have unsaved changes"
  ): void {
    fromEvent(window, "beforeunload")
      .pipe(
        tap((event: BeforeUnloadEvent) => {
          if (this.form.dirty) {
            event.preventDefault();
            event.returnValue = false;
            return message;
          } else {
            return null;
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }
}
