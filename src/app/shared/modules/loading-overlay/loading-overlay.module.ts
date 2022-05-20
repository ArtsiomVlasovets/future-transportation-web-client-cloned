import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingOverlayComponent } from "./loading-overlay/loading-overlay.component";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ShowLoadingOverlayDirective } from "./show-loading-overlay.directive";

@NgModule({
  declarations: [LoadingOverlayComponent, ShowLoadingOverlayDirective],
  exports: [ShowLoadingOverlayDirective],
  imports: [
    CommonModule,
    // MatProgressSpinnerModule
  ],
})
export class LoadingOverlayModule {}
