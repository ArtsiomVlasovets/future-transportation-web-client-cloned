import { HeaderComponent } from "./../../../header/header.component";
import { CommonLayoutComponent } from "./../../../components/common-layout/common-layout.component";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortalRoutingModule } from "./portal-routing.module";

@NgModule({
  declarations: [HeaderComponent, CommonLayoutComponent],
  imports: [CommonModule, PortalRoutingModule, SharedModule],
})
export class PortalModule {}
