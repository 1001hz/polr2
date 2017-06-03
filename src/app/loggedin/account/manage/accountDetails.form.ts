import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services';
import { User } from '../../../models/user.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { UserService } from '../../../services';

@Component({
  selector: 'account-details-form',
  template: `
  <form [formGroup]="accountDetailsForm" (ngSubmit)="onSubmit(accountDetailsForm.value)">

      <div class="form__group form__group--input">
        <label for="email">email</label>
        <input type="text" id="email" [formControl]="accountDetailsForm.controls['email']">
      </div>

      <div class="form__group form__group--input">
        <label for="fname">First Name</label>
        <input type="text" id="fname" [formControl]="accountDetailsForm.controls['fname']">
        <span *ngIf="accountDetailsForm.controls['fname'].hasError('required') && accountDetailsForm.controls['fname'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="email">Last Name</label>
        <input type="text" id="lname" [formControl]="accountDetailsForm.controls['lname']">
        <span *ngIf="accountDetailsForm.controls['lname'].hasError('required') && accountDetailsForm.controls['lname'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!accountDetailsForm.valid">Submit</button>
      </div>

    </form>
  `
})
export class AccountDetailsForm {

  accountDetailsForm: FormGroup;
  private _user: User;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
    ) {

    // get logged in user details
    this.authService.user.subscribe(user => {

      // set local user var
      this._user = user;

      // initialise the form
      this.accountDetailsForm = fb.group({
        'email': [{value: user.email, disabled: true}, Validators.required],
        'fname': [user.fname, Validators.required],
        'lname': [user.lname, Validators.required]
      });

    });
  }

  onSubmit(value: any) {
    // update local user var
    this._user.setFname(value.fname);
    this._user.setLname(value.lname);

    // service will handle updating server / app state
    this.userService.update(this._user)
    .subscribe(
      data => {},
      error => { console.log(error) }
    );
  }
}
