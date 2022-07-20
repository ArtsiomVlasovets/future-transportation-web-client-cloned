import { CommonPageComponent } from "./shared/components/common-page/common-page.component";
import { SharedModule } from "./shared/modules/shared/shared.module";
import { ZonesComponent } from "./components/zones/zones.component";
import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { RatingComponent } from "./components/team/rating.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CardComponent } from "./components/planning/cards/card.component";
import { PlanningComponent } from "./components/planning/planning.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { HeaderComponent } from "./header/header.component";
import { TeamComponent } from "./components/team/team.component";
import { CustomMessagesService } from "./services/custom-messages.service";

// TODO will be included to import
import {
  ExcelModule,
  GridModule,
  PDFModule,
} from "@progress/kendo-angular-grid";
import { LabelModule } from "@progress/kendo-angular-label";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { SchedulerModule } from "@progress/kendo-angular-scheduler";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { EditorModule } from "@progress/kendo-angular-editor";
import { FileSelectModule } from "@progress/kendo-angular-upload";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { MessageService } from "@progress/kendo-angular-l10n";
import "hammerjs";
import "@progress/kendo-angular-intl/locales/en/all";
import "@progress/kendo-angular-intl/locales/es/all";
import "@progress/kendo-angular-intl/locales/fr/all";
import { LoginComponent } from "./components/login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxsModule, NoopNgxsExecutionStrategy } from "@ngxs/store";
import { GLOBAL_STATES } from "./shared/state/global-states";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { ApiUrlInterceptor } from "./core/interceptors/api-url.interceptor";
import { CommonLayoutComponent } from "./components/common-layout/common-layout.component";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsRouterPluginModule } from "@ngxs/router-plugin";
import { CountriesComponent } from "./components/countries/countries.component";
import { CitiesComponent } from "./components/cities/cities.component";
import { CommonMenuLayoutComponent } from "./components/common-menu-layout/common-menu-layout.component";
import { CommonTabsLayoutComponent } from "./components/common-tabs-layout/common-tabs-layout.component";
import { StatesComponent } from "./components/states/states.component";
import { QuotesComponent } from "./components/quotes/quotes.component";
import { AccountingComponent } from "./components/accounting/accounting.component";
import { CrmComponent } from "./components/crm/crm.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { WebPortalComponent } from "./components/web-portal/web-portal.component";
import { SettingsComponent } from "./components/settings/settings.component";
// import { WindowDialogComponent } from './shared/components/window-dialog/window-dialog.component';

const drawerRoutes = [
  {
    text: "Dashboard",
    icon: "k-i-toggle-full-screen-mode",
    path: "/dashboard",
    selected: true,
  },
  {
    text: "Quotes",
    icon: "k-i-book",
    path: "/quotes",
  },
  {
    text: "Accounting",
    icon: "k-i-table-properties",
    path: "/accounting",
  },
  {
    text: "CRM",
    icon: "k-i-folder",
    path: "/crm",
  },
  {
    text: "Data Library",
    icon: "k-i-copy",
    path: "/data-library",
  },
  {
    text: "Reports",
    icon: "k-i-home",
    path: "/reports",
  },
  { separator: true },
  {
    text: "Web Portal",
    icon: "k-i-hyperlink-open",
    path: "/web-portal",
  },
  { separator: true },
  {
    text: "Settings",
    icon: "k-i-gear",
    path: "/settings",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    CardComponent,
    PlanningComponent,
    ProfileComponent,
    ZonesComponent,
    TeamComponent,
    LoginComponent,
    CommonPageComponent,
    CountriesComponent,
    CitiesComponent,
    DashboardComponent,
    StatesComponent,
    CommonTabsLayoutComponent,
    // CommonMenuLayoutComponent,
    HeaderComponent,
    CommonLayoutComponent,
    QuotesComponent,
    AccountingComponent,
    CrmComponent,
    ReportsComponent,
    WebPortalComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    // Add satte file
    NgxsModule.forRoot([...GLOBAL_STATES], {
      developmentMode: !environment.production,
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsStoragePluginModule.forRoot({
      // key: ["currentUser.userId", "currentUser.authToken", "currentUser.type"],
      key: [
        "currentUser.userDetails",
        "currentUser.authToken",
        "currentUser.type",
      ],
    }),
    NgxsRouterPluginModule.forRoot(),
    // RouterModule.forRoot(drawerRoutes),
  ],
  providers: [
    { provide: MessageService, useClass: CustomMessagesService },
    { provide: LOCALE_ID, useValue: "en-US" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [HeaderComponent, CommonLayoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
