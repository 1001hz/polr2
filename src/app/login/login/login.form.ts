import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">

      <div class="form__group form__group--input">
        <label for="email">email</label>
        <input type="text" id="email" [formControl]="loginForm.controls['email']">
        <span *ngIf="loginForm.controls['email'].hasError('required') && loginForm.controls['email'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="password">Password</label>
        <input type="password" id="password" [formControl]="loginForm.controls['password']">
        <span *ngIf="loginForm.controls['password'].hasError('required') && loginForm.controls['password'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!loginForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class LoginForm {

  loginForm: FormGroup;
  public serverError: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    this.serverError = null;
    this.authService.login(value.email, value.password)
      .subscribe(
      ( data ) => this.router.navigate(['app']),
      ( error ) => this.serverError = error
    );
  }
}
