import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_USER, RESET_USER } from '../reducers/user.reducer.ts';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

interface AppState {
  user: User;
}

@Injectable()
export class AuthService {

  public user: Subject<User> = new BehaviorSubject<User>(new User());

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    store.select('user').subscribe( (u:User) => {
      this.user.next(u);
    } );
  }

  tokenLogin(token) {

    return this.apiService.apiPost('/api/token-login', {"token": token}, false)
      .map((response) => {

        // create user object
        let user = new User();
        user.makeFromApiData(response);

        // save to app state
        this.store.dispatch({ type: SET_USER, payload: user });

        localStorage.setItem("polrtoken", user.token);
      })
      .share();
  }

  login(username, password) {

    // talk to server
    var credentials = {
      username: username,
      password: password
    };

    return this.apiService.apiPost('/api/login', credentials, false)
      .map((response) => {

        // create user object
        let user = new User();
        user.makeFromApiData(response);

        // save to app state
        this.store.dispatch({ type: SET_USER, payload: user });

        localStorage.setItem("polrtoken", user.token);
      })
      .share();
  }

  logout(): any {

    return this.apiService.apiGet('/api/user/logout', true)
      .map((response) => {
        this.store.dispatch({ type: RESET_USER });

        localStorage.removeItem("polrtoken");

        this.messageService.success("Successfully logged out");
      })
      .share();
  }

  signup(userCredentials): any {

    return this.apiService
      .apiPost('/api/open/user', userCredentials, false)
      .map((response) => {

        // create user object
        let user = new User();
        user.makeFromApiData(response);

        // save to app state
        this.store.dispatch({ type: SET_USER, payload: user });

        localStorage.setItem("polrtoken", user.token);
      })
      .share();
  }

  forgotPassword(email): any {
    return this.apiService
      .apiPost('/api/forgot-password', {email: email}, false)
      .map((response) => {
        this.messageService.success(response.message);
      })
      .share();
  }

  resetPassword(key, email, password): any {
    return this.apiService
      .apiPost('/api/reset-password', {token: key, email: email, password: password}, false)
      .map((response) => {
        this.messageService.success(response.message);
      })
      .share();
  }

}

export const AUTH_PROVIDERS: Array<any> = [
    AuthService
];
