import { ZonesComponent } from "./components/zones/zones.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PlanningComponent } from "./components/planning/planning.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TeamComponent } from "./components/team/team.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RouteName } from "./core/models/route-name.enum";
import { AuthGuard } from "./core/guards/auth.guard";
import { CurrentUserDetailsGuard } from "./core/guards/current-user-details.guard";
import { CommonPageComponent } from "./shared/components/common-page/common-page.component";

// TODO
// const routes: Routes = [
//   {
//     path: '',
//     component: CommonPageComponent,
//     canActivate: [AuthGuard, CurrentUserDetailsGuard],
//     // canActivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         pathMatch: 'full',
//         redirectTo: `${RouteName.Dashboard}/zones`,
//       },
//       {
//         path: RouteName.Dashboard,
//         loadChildren: () =>
//           import('./shared/modules/portal/portal.module').then(
//             (m) => m.PortalModule
//           ),
//       },
//     ],
//   },
//   {
//     path: RouteName.Auth,
//     loadChildren: () =>
//       import('./pages/auth/auth.module').then((m) => m.AuthModule),
//   },

//   // {
//   //   path: "",
//   //   component: CommonPageComponent,
//   // },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },

//   {
//     path: RouteName.NotFound,
//     loadChildren: () =>
//       import('./pages/not-found/not-found.module').then(
//         (m) => m.NotFoundModule
//       ),
//   },
//   {
//     path: '**',
//     pathMatch: 'full',
//     redirectTo: RouteName.NotFound,
//   },
// ];

const routes: Routes = [
  {
    path: "",
    component: CommonPageComponent,
    canActivate: [AuthGuard, CurrentUserDetailsGuard],
    // canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: `${RouteName.DataLibrary}/zones`,
      },
      {
        path: RouteName.DataLibrary,
        loadChildren: () =>
          import("./shared/modules/data-library/data-library.module").then(
            (m) => m.DataLibraryModule
          ),
      },
    ],
  },
  {
    path: RouteName.Auth,
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
  },

  {
    path: RouteName.Dashboard,
    loadChildren: () =>
      import("./shared/modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: RouteName.Quotes,
    loadChildren: () =>
      import("./shared/modules/quotes/quotes.module").then(
        (m) => m.QuotesModule
      ),
  },

  {
    path: RouteName.Accounting,
    loadChildren: () =>
      import("./shared/modules/accounting/accounting.module").then(
        (m) => m.AccountingModule
      ),
  },

  {
    path: RouteName.CRM,
    loadChildren: () =>
      import("./shared/modules/crm/crm.module").then((m) => m.CrmModule),
  },

  // {
  //   path: RouteName.DataLibrary,
  //   loadChildren: () =>
  //     import("./shared/modules/data-library/data-library.module").then(
  //       (m) => m.DataLibraryModule
  //     ),
  // },

  {
    path: RouteName.Reports,
    loadChildren: () =>
      import("./shared/modules/reports/reports.module").then(
        (m) => m.ReportsModule
      ),
  },

  {
    path: RouteName.WebPortal,
    loadChildren: () =>
      import("./shared/modules/web-portal/web-portal.module").then(
        (m) => m.WebPortalModule
      ),
  },

  {
    path: RouteName.Settings,
    loadChildren: () =>
      import("./shared/modules/settings/settings.module").then(
        (m) => m.SettingsModule
      ),
  },

  // {
  //   path: "",
  //   component: CommonPageComponent,
  // },
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: RouteName.NotFound,
    loadChildren: () =>
      import("./pages/not-found/not-found.module").then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: RouteName.NotFound,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
