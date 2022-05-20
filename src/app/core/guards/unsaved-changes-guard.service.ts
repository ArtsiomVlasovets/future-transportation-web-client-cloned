import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UnsavedChangesDialogComponent} from '../../shared/modules/unsaved-changes-dialog/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {UnsavedChanges} from '../../models/unsaved-changes.model';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<UnsavedChanges> {
  constructor(private matDialog: MatDialog) {
  }

  canDeactivate(component: UnsavedChanges,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.hasUnsavedChanges()) {
      return this.matDialog.open<UnsavedChangesDialogComponent, boolean>(UnsavedChangesDialogComponent, {
        disableClose: true
      }).afterClosed();
    }
    return true;
  }
}
