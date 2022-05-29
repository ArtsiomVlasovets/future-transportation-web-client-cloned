import { Select } from "@ngxs/store";
import { CurrentUserState } from "./../../shared/state/current-user/current-user.state";
import { CustomMessagesService } from "./../../services/custom-messages.service";
import { MessageService } from "@progress/kendo-angular-l10n";
import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import {
  DrawerComponent,
  DrawerMode,
  DrawerSelectEvent,
} from "@progress/kendo-angular-layout";
import { Observable } from "rxjs";

@Component({
  selector: "app-common-layout",
  templateUrl: "./common-layout.component.html",
  styleUrls: ["./common-layout.component.scss"],
})
export class CommonLayoutComponent implements OnInit {
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

  ngOnInit(): void {
    // Update Drawer selected state when change router path
    this.router.events.subscribe((route: any) => {
      if (route instanceof NavigationStart) {
        this.items = this.drawerItems().map((item) => {
          if (item.path && item.path === route.url) {
            item.selected = true;
            return item;
          } else {
            item.selected = false;
            return item;
          }
        });
      }
    });

    this.setDrawerConfig();

    this.customMsgService.localeChange.subscribe(() => {
      this.items = this.drawerItems();

    });

    window.addEventListener("resize", () => {
      this.setDrawerConfig();
    });

  }

  ngOnDestroy() {
    window.removeEventListener("resize", () => {});
  }

  public setDrawerConfig() {
    const pageWidth = window.innerWidth;
    if (pageWidth <= 770) {
      this.mode = "overlay";
      this.mini = false;
    } else {
      this.mode = "push";
      this.mini = true;
    }
  }

  public drawerItems() {
    return [
      {
        text: this.customMsgService.translate("zones"),
        icon: "k-i-information",
        path: "/portal//zones",
        selected: true,
      },
    ];
  }

  public toggleDrawer(drawer: DrawerComponent): void {
    drawer.toggle();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    debugger
    this.router.navigate([ev.item.path]);
    this.selected = ev.item.text;
  }
}
