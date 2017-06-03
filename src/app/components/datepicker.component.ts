import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'date-picker',
  template: `
    <input type="text" id="date" [(ngModel)]="dateValue" (blur)="changeIt()" [disabled]="isDisabled">
    <div (click)="changeIt()">Change</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {

  private dateValue;
  private isDisabled;

  constructor() {
    this.isDisabled = false;
  }

  writeValue(value: any) {

    if(value){
      this.dateValue = moment(parseInt(value)).format('DD/MM/YYYY');
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  setDisabledState() {
    this.isDisabled = true;
  }


  changeIt() {
    var d = moment(this.dateValue, 'DD/MM/YYYY').format('x');
    console.log(this.dateValue, d);
    this.propagateChange(d);
  }
}
