import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';

@Component({
  selector: 'forgot-password-form',
  template: `
    <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit(forgotPasswordForm.value)">

      <div class="form__group form__group--input">
        <label for="email">Email</label>
        <input type="text" id="email" [formControl]="forgotPasswordForm.controls['email']">
        <span *ngIf="forgotPasswordForm.controls['email'].hasError('required') && forgotPasswordForm.controls['email'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!forgotPasswordForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class ForgotPasswordForm {

  forgotPasswordForm: FormGroup;
  public serverError: string;

  constructor(
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = fb.group({
      'email': ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    this.serverError = null;
    this.authService.forgotPassword(value.email)
    .subscribe(
      data => {},
      error => this.serverError = error
    );
  }
}
