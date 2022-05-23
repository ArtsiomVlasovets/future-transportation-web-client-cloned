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
        redirectTo: `${RouteName.Portal}/zones`,
      },
      {
        path: RouteName.Portal,
        loadChildren: () =>
          import("./shared/modules/portal/portal.module").then(
            (m) => m.PortalModule
          ),
      },
    ],
  },
  {
    path: RouteName.Auth,
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
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
