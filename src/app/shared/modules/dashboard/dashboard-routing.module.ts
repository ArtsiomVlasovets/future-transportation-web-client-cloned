import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonLayoutComponent } from "src/app/components/common-layout/common-layout.component";
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: CommonLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
