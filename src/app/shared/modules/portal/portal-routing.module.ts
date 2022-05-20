import { ZonesComponent } from "./../../../components/zones/zones.component";
import { ProfileComponent } from "./../../../components/profile/profile.component";
import { PlanningComponent } from "./../../../components/planning/planning.component";
import { DashboardComponent } from "./../../../components/dashboard/dashboard.component";
import { TeamComponent } from "./../../../components/team/team.component";
import { CommonLayoutComponent } from "./../../../components/common-layout/common-layout.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { RouteName } from "../../models/route-name.enum";

const routes: Routes = [
  {
    path: "",
    component: CommonLayoutComponent,
    children: [
      {
        path: "",
        component: TeamComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "planning",
        component: PlanningComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "zones",
        component: ZonesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
