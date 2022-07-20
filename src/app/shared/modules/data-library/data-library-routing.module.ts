import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitiesComponent } from "src/app/components/cities/cities.component";
import { CommonLayoutComponent } from "src/app/components/common-layout/common-layout.component";
import { CommonMenuLayoutComponent } from "src/app/components/common-menu-layout/common-menu-layout.component";
import { CountriesComponent } from "src/app/components/countries/countries.component";
import { StatesComponent } from "src/app/components/states/states.component";
import { ZonesComponent } from "src/app/components/zones/zones.component";

const routes: Routes = [
  {
    path: "",
    component: CommonLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "zones",
      },
      {
        path: "zones",
        component: CommonMenuLayoutComponent,
        children: [
          {
            path: "",
            component: ZonesComponent,
          },
        ],
      },
      {
        path: "countries",
        component: CommonMenuLayoutComponent,
        children: [
          {
            path: "",
            component: CountriesComponent,
          },
        ],
      },
      {
        path: "cities",
        component: CommonMenuLayoutComponent,
        children: [
          {
            path: "",
            component: CitiesComponent,
          },
        ],
      },
      {
        path: "states",
        component: CommonMenuLayoutComponent,
        children: [
          {
            path: "",
            component: StatesComponent,
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
export class DataLibraryRoutingModule {}
