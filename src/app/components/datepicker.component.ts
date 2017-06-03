import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'date-picker',
  template: `
    <input type="text" id="date" value="{{dateValue}}">
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

  writeValue(value: any) {
    if(!value){
      this.dateValue = moment();
    }
    else{
      this.dateValue = moment(parseInt(value)).format('YYYY-MM-DD');
    }

  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  setDisabledState() {}


  changeIt() {
    this.dateValue++;
    this.propagateChange(this.dateValue);
  }
}
