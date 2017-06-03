import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LOGIN_COMPONENTS } from './login';
import { SIGNUP_COMPONENTS } from './signup';
import { FORGOT_PASSWORD_COMPONENTS } from './forgotPassword';
import { RESET_PASSWORD_COMPONENTS } from './resetPassword';

import { ROUTES } from './login.routes';

@NgModule({
  declarations: [
    ...LOGIN_COMPONENTS,
    ...SIGNUP_COMPONENTS,
    ...FORGOT_PASSWORD_COMPONENTS,
    ...RESET_PASSWORD_COMPONENTS
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class LoginModule {

}
