import { Observable } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { Select } from "@ngxs/store";
import { MessageService } from "@progress/kendo-angular-l10n";
import {
  DrawerComponent,
  DrawerMode,
  DrawerSelectEvent,
} from "@progress/kendo-angular-layout";
import { CustomMessagesService } from "./services/custom-messages.service";
import { CurrentUserState } from "./shared/state/current-user/current-user.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  public selected = "Team";
  public items: Array<any> = [];
  public customMsgService: CustomMessagesService;
  public mode: DrawerMode = "push";
  public mini = true;

  @Select(CurrentUserState.isUserInit)
  isUserInit$!: Observable<boolean>;

  constructor(private router: Router, public msgService: MessageService) {
    this.customMsgService = this.msgService as CustomMessagesService;
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
    
  }
}
