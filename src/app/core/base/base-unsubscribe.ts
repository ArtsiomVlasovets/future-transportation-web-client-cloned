import {Observable, Subject} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';

@Directive({
})
export abstract class BaseUnsubscribe implements OnDestroy {
    private componentDestroyed = new Subject<void>();
    protected componentDestroyed$: Observable<void> = this.componentDestroyed.asObservable();

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }
}
