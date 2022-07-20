import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "./../shared/shared.module";
import { DataLibraryRoutingModule } from "./data-library-routing.module";
import { CommonMenuLayoutComponent } from "src/app/components/common-menu-layout/common-menu-layout.component";

@NgModule({
  declarations: [CommonMenuLayoutComponent],
  imports: [CommonModule, DataLibraryRoutingModule, SharedModule],
})
export class DataLibraryModule {}
