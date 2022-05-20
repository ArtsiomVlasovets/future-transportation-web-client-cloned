import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "ftwp-auth-common-layout",
  templateUrl: "./auth-common-layout.component.html",
  styleUrls: ["./auth-common-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCommonLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
