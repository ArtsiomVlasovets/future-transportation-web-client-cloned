import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CldrIntlService, IntlService } from "@progress/kendo-angular-intl";
import { MessageService } from "@progress/kendo-angular-l10n";
import { CustomMessagesService } from "../services/custom-messages.service";
import { locales } from "src/app/resources/locales";
import { Store } from "@ngxs/store";
import { SignOutAction } from "../shared/state/current-user/current-user.actions";

@Component({
  selector: "app-header-component",
  templateUrl: "./header.commponent.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() public toggle = new EventEmitter();
  @Input() public selectedPage?: string;
  // @Input() isUserInit = false;

  public customMsgService: CustomMessagesService;
  public currentPage = "";
  public selectedLanguage = { locale: "English", localeId: "en-US" };
  public locales = locales;
  public popupSettings = { width: "150" };
  public themes: { href: string; text: string }[] = [
    {
      href: "assets/custom-default-theme/dist/all.css",
      text: "Default",
    },
    {
      href: "assets/custom-default-theme-urban/dist/all.css",
      text: "Default-Urban",
    },
    {
      href: "assets/custom-material-theme-indigo/dist/all.css",
      text: "Material-Indigo",
    },
    {
      href: "assets/custom-material-theme-teal/dist/all.css",
      text: "Material-Teal",
    },
  ];
  public selectedTheme = this.themes[0];
  public listItems: Array<string> = ["Profile", "Settings", "Log Out"];

  constructor(
    public messages: MessageService,
    private store: Store,
    @Inject(LOCALE_ID) public localeId: string,
    public intlService: IntlService,
    private cdf: ChangeDetectorRef
  ) {
    this.localeId = this.selectedLanguage.localeId;
    this.setLocale(this.localeId);

    this.customMsgService = this.messages as CustomMessagesService;
    this.customMsgService.language = this.selectedLanguage.localeId;

    this.initCustomiztion();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.["selectedPage"]?.currentValue !==
        changes?.["selectedPage"]?.previousValue ||
      changes?.["selectedPage"]
    ) {
      this.currentPage = changes?.["selectedPage"].currentValue;
      console.log("this.currentPage :>> ", this.currentPage);
      this.cdf.markForCheck();
    }
  }

  public initCustomiztion() {
    const locale =
      locales.find((loc) => {
        loc.localeId === localStorage.getItem("localeId");
      }) || locales[0];

    this.changeTheme({
      href: localStorage.getItem("theme") || this.themes[0].href,
      text: "",
    });

    setTimeout(() => {
      this.changeLanguage(locale);
    }, 100);
  }

  public changeProfileDropdown(item: any) {
    if (item === "Log Out") {
      this.store.dispatch(new SignOutAction());
    }
  }

  public changeTheme(theme: { href: string; text: string }) {
    localStorage.setItem("theme", theme.href);

    this.selectedTheme = theme;
    const themeEl: any = document.getElementById("theme");
    themeEl.href = theme.href;
  }

  public changeLanguage(item: any): void {
    this.customMsgService.language = item.localeId;
    this.setLocale(item.localeId);
  }

  public setLocale(locale: any): void {
    (this.intlService as CldrIntlService).localeId = locale;

    localStorage.setItem("localeId", locale.localeId);
  }

  public onButtonClick(): void {
    this.toggle.emit();
  }
}
