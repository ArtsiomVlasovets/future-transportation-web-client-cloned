import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from '../../../core/utils';

@Pipe({
  name: 'unixTimestampToDate'
})
export class UnixTimestampToDatePipe implements PipeTransform {

  transform(value: number): Date {
    return Utils.unixTimestampToDate(value);
  }

}
