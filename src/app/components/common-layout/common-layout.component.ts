import { Select } from "@ngxs/store";
import { CurrentUserState } from "./../../shared/state/current-user/current-user.state";
import { CustomMessagesService } from "./../../services/custom-messages.service";
import { MessageService } from "@progress/kendo-angular-l10n";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import {
  DrawerComponent,
  DrawerMode,
  DrawerSelectEvent,
} from "@progress/kendo-angular-layout";
import { Observable } from "rxjs";
import { NavigationService } from "src/app/core/service/navigation.service";
import { PAGES } from "src/app/core/constants";
import { take } from "rxjs/operators";

@Component({
  selector: "app-common-layout",
  templateUrl: "./common-layout.component.html",
  styleUrls: ["./common-layout.component.scss"],
})
export class CommonLayoutComponent implements OnInit {
  public expanded = true;
  public selected = "";
  public items: Array<any> = [];
  public customMsgService: CustomMessagesService;
  public mode: DrawerMode = "push";
  public mini = true;
  public isItemsLoaded = true;

  @Select(CurrentUserState.isUserInit)
  isUserInit$!: Observable<boolean>;

  constructor(
    private router: Router,
    public msgService: MessageService,
    public navigationService: NavigationService,
    private cdf: ChangeDetectorRef
  ) {
    this.customMsgService = this.msgService as CustomMessagesService;
    this.items = [
      ...this.drawerItems().map((item) => {
        if (item.path && this.router.url.includes(item.path)) {
          item.selected = true;

          return item;
        } else {
          item.selected = false;
          return item;
        }
      }),
    ];
  }

  ngOnInit(): void {
    this.setDrawerConfig();

    // TODO - wait locale service init
    // this.customMsgService.localeChange.subscribe(() => {
    //   this.items = this.drawerItems();
    // });

    window.addEventListener("resize", () => {
      this.setDrawerConfig();
    });

    this.navigationService.navigationState.subscribe((selectedPage) => {
      this.selected = selectedPage;
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
        text: this.customMsgService.translate("dashboard"),
        icon: "k-i-toggle-full-screen-mode",
        path: "/dashboard",
        selected: false,
      },
      {
        text: this.customMsgService.translate("quotes"),
        icon: "k-i-book",
        path: "/quotes",
        selected: false,
      },
      {
        text: this.customMsgService.translate("accounting"),
        icon: "k-i-table-properties",
        path: "/accounting",
        selected: false,
      },
      {
        text: this.customMsgService.translate("crm"),
        icon: "k-i-folder",
        path: "/crm",
        selected: false,
      },
      {
        text: this.customMsgService.translate("dataLibrary"),
        icon: "k-i-copy",
        path: "/data-library",
        selected: false,
      },
      {
        text: this.customMsgService.translate("reports"),
        icon: "k-i-home",
        path: "/reports",
        selected: false,
      },
      { separator: true },
      {
        text: this.customMsgService.translate("webPortal"),
        icon: "k-i-hyperlink-open",
        path: "/web-portal",
        selected: false,
      },
      { separator: true },
      {
        text: this.customMsgService.translate("settings"),
        icon: "k-i-gear",
        path: "/settings",
        selected: false,
      },
    ];
  }

  public toggleDrawer(drawer: DrawerComponent): void {
    drawer.toggle();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    const selected = ev.item.text;
    this.navigationService.navigationState.next(PAGES[selected]);
    this.router.navigate([ev.item.path]);
  }
}
