import { LoginComponent } from './login/login.component.ts';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';

export const ROUTES = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:key', component: ResetPasswordComponent }
];
