import {NgModule} from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {MatchBreakpointPipe} from './match-breakpoint.pipe';


@NgModule({
  imports: [
    LayoutModule
  ],
  declarations: [
    MatchBreakpointPipe
  ],
  exports: [
    MatchBreakpointPipe
  ]
})
export class MatchBreakpointModule { }
