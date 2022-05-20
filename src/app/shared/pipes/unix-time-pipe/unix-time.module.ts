import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnixTimestampToDatePipe } from './unix-timestamp-to-date.pipe';



@NgModule({
  declarations: [UnixTimestampToDatePipe],
  exports: [UnixTimestampToDatePipe],
  imports: [
    CommonModule
  ]
})
export class UnixTimeModule { }
