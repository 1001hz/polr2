import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reset-password-form',
  template: `
    <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit(resetPasswordForm.value)">

      <div class="form__group form__group--input">
        <label for="email">Email</label>
        <input type="text" id="email" [formControl]="resetPasswordForm.controls['email']">
        <span *ngIf="resetPasswordForm.controls['email'].hasError('required') && resetPasswordForm.controls['email'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="password">Password</label>
        <input type="password" id="password" [formControl]="resetPasswordForm.controls['password']">
        <span *ngIf="resetPasswordForm.controls['password'].hasError('required') && resetPasswordForm.controls['password'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="confirm">Confirm Password</label>
        <input type="password" id="confirm" [formControl]="resetPasswordForm.controls['confirm']">
        <span *ngIf="resetPasswordForm.controls['confirm'].hasError('required') && resetPasswordForm.controls['confirm'].touched">Required field</span>
        <span *ngIf="resetPasswordForm.controls['confirm'].value !== resetPasswordForm.controls['password'].value && resetPasswordForm.controls['password'].touched">Passwords don't match</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!resetPasswordForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class ResetPasswordForm {

  resetPasswordForm: FormGroup;
  private serverError: string;
  private key: string;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm': ['', Validators.required]
    });

    // get the key to verify a valid password reset link
    route.params.subscribe( params => {
      this.key = params['key'];
    })
  }

  onSubmit(value: any) {
    this.serverError = null;
    this.authService.resetPassword(this.key, value.email, value.password)
      .subscribe(
        data => {},
        error => this.serverError = error
    );
  }
}
