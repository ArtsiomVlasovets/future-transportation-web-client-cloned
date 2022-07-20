import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  public navigationState = new BehaviorSubject("");

  constructor(private router: Router) {}

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
