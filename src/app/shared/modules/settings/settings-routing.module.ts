import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonLayoutComponent } from "src/app/components/common-layout/common-layout.component";
import { CommonMenuLayoutComponent } from "src/app/components/common-menu-layout/common-menu-layout.component";
import { SettingsComponent } from "src/app/components/settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: CommonLayoutComponent,
    children: [
      {
        path: "",
        component: CommonMenuLayoutComponent,
        children: [
          {
            path: "",
            component: SettingsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
