import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { fadeInOutAnimation } from '../../../../core/animations';

@Component({
  selector: 'ftwp-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutAnimation()],
})
export class LoadingOverlayComponent {
  @HostBinding('@fadeInOut') animation = true;

  @Input() spinnerDiameter: number = 60;
}
