import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService) {

  }

  canActivate(): Observable<boolean> {
      return this.authService.user.map( user => {
        if(user._id) {
          return true;
        }
      }).first();
  }
}

export const LOGIN_GUARD_PROVIDERS: Array<any> = [
  LoginGuard
];
