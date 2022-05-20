import { RouteName } from "./../../core/models/route-name.enum";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "./components/sign-up-page/sign-up-page.component";
import { AuthCommonLayoutComponent } from "./components/auth-common-layout/auth-common-layout.component";
import { SignInPageComponent } from "./components/sign-in-page/sign-in-page.component";

const routes: Routes = [
  {
    path: "",
    component: AuthCommonLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: RouteName.SignIn,
      },
      {
        path: RouteName.SignUp,
        component: SignUpPageComponent,
      },
      {
        path: RouteName.SignIn,
        component: SignInPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
