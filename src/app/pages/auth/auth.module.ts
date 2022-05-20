import { SharedModule } from "./../../shared/modules/shared/shared.module";
import { LoadingOverlayModule } from "./../../shared/modules/loading-overlay/loading-overlay.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInPageComponent } from "./components/sign-in-page/sign-in-page.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SignUpPageComponent } from "./components/sign-up-page/sign-up-page.component";
import { AuthCommonLayoutComponent } from "./components/auth-common-layout/auth-common-layout.component";
import { EmailPasswordFormComponent } from "./components/email-password-form/email-password-form.component";
import { ReactiveFormsModule } from "@angular/forms";

// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { ControlErrorsModule } from "../../shared/pipes/control-errors/control-errors.module";
// import {MatInputModule} from '@angular/material/input';
// import {LoadingOverlayModule} from '../../shared/modules/loading-overlay/loading-overlay.module';
// import {MatIconModule} from '@angular/material/icon';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {StopPropagationOnModule} from '../../shared/directives/stop-propagation-on/stop-propagation-on.module';
// import {MaterialFormFieldRequiredAsteriskModule} from '../../shared/directives/material-form-field-required-asterisk/material-form-field-required-asterisk.module';
// import {MarkForCheckOnTouchedChangesModule} from '../../shared/directives/mark-for-check-on-touched-changes/mark-for-check-on-touched-changes.module';
// import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    SignUpPageComponent,
    AuthCommonLayoutComponent,
    EmailPasswordFormComponent,
    SignInPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // MatCardModule,
    // MatButtonModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    SharedModule,
    ControlErrorsModule,
    LoadingOverlayModule,
    // MatIconModule,
    // MatTooltipModule,
    // StopPropagationOnModule,
    // MaterialFormFieldRequiredAsteriskModule,
    // MarkForCheckOnTouchedChangesModule,
    // NgxMaskModule
  ],
})
export class AuthModule {}
