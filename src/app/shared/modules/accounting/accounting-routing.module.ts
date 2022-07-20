import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountingComponent } from "src/app/components/accounting/accounting.component";
import { CommonLayoutComponent } from "src/app/components/common-layout/common-layout.component";
import { CommonMenuLayoutComponent } from "src/app/components/common-menu-layout/common-menu-layout.component";

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
            component: AccountingComponent,
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
export class AccountingRoutingModule {}
