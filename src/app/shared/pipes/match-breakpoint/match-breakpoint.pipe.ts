import {Pipe, PipeTransform} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {BreakpointState} from '@angular/cdk/layout/breakpoints-observer';
import {Observable} from 'rxjs';

type CustomBreakpoint = 'sm' | 'md' | 'lg';

@Pipe({
  name: 'matchBreakpoint'
})
export class MatchBreakpointPipe implements PipeTransform {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  transform(breakpoints: Array<CustomBreakpoint | string>): Observable<boolean> {
    return this.breakpointObserver.observe(this.mapBreakpoints(breakpoints)).pipe(
      map((state: BreakpointState) => state.matches),
      distinctUntilChanged(),
    );
  }

  private mapBreakpoints(breakpoints: Array<CustomBreakpoint | string>): string[] {
    const result = [];
    if (breakpoints.includes('sm')) {
      result.push(Breakpoints.XSmall);
      result.push(Breakpoints.Small);
    }
    if (breakpoints.includes('md')) {
      result.push(Breakpoints.Medium);
    }
    if (breakpoints.includes('lg')) {
      result.push(Breakpoints.Large);
    }
    return result;
  }

}
