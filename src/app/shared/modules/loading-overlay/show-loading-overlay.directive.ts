import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { ReplaySubject } from "rxjs";
import { BaseUnsubscribe } from "../../../core/base/base-unsubscribe";
import { distinctUntilChanged, takeUntil, tap } from "rxjs/operators";
import { LoadingOverlayComponent } from "./loading-overlay/loading-overlay.component";
import { LoadingOverlaySettings } from "./loading-overlay-settings.model";

const DEFAULT_SETTINGS: LoadingOverlaySettings = {
  spinnerDiameter: 60,
  makeHostFontTransparent: false,
};

@Directive({
  selector: "[ftwpShowLoadingOverlay]",
})
export class ShowLoadingOverlayDirective
  extends BaseUnsubscribe
  implements OnInit
{
  private shouldShowLoadingOverlaySource = new ReplaySubject<boolean>(1);
  private componentRef!: ComponentRef<LoadingOverlayComponent>;
  private componentFactory: ComponentFactory<LoadingOverlayComponent> =
    this.componentFactoryResolver.resolveComponentFactory(
      LoadingOverlayComponent
    );
  private settings: LoadingOverlaySettings = DEFAULT_SETTINGS;

  @Input("ftwpShowLoadingOverlay") set shouldShowLoadingOverlay(
    value: boolean | null
  ) {
    this.shouldShowLoadingOverlaySource.next(Boolean(value));
  }

  @Input() set loadingOverlaySettings(value: Partial<LoadingOverlaySettings>) {
    this.settings = { ...DEFAULT_SETTINGS, ...value };
  }

  @HostBinding("style.position") hostPosition = "relative";
  @HostBinding("style.color") hostFontColor: string | null = null;
  @HostBinding("style.pointer-events") hostPointerEvents: string | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.showOrHideLoadingComponent();
  }

  private showOrHideLoadingComponent() {
    this.shouldShowLoadingOverlaySource
      .asObservable()
      .pipe(
        distinctUntilChanged(),
        tap((shouldShowLoadingOverlay: boolean) => {
          if (shouldShowLoadingOverlay) {
            this.componentRef = this.viewContainerRef.createComponent(
              this.componentFactory
            );
            this.componentRef.instance.spinnerDiameter =
              this.settings.spinnerDiameter;
            this.hostPointerEvents = "none";
            if (this.settings.makeHostFontTransparent) {
              this.hostFontColor = "transparent";
            }
            /* Make created component to be a child of the current host element */
            this.elementRef.nativeElement.appendChild(
              this.componentRef.location.nativeElement
            );
          } else {
            this.componentRef?.destroy();
            this.hostPointerEvents = null;
            this.hostFontColor = null;
          }
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }
}
