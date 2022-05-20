import {NgModule} from '@angular/core';
import {ControlErrorsPipe} from './control-errors.pipe';


@NgModule({
  declarations: [ControlErrorsPipe],
  exports: [ControlErrorsPipe],
})
export class ControlErrorsModule { }
