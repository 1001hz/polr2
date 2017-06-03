import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UPDATE_USER } from '../reducers/user.reducer';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { MessageService } from './message.service';

interface AppState {
  user: User;
}

@Injectable()
export class UserService {

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private messageService: MessageService
  ){}

  update(user: User) {

    return this.apiService
      .apiPost('/api/user', user, true)
      .map((response) => {

        // create user object
        let user = new User();
        user.makeFromApiData(response);

        // save to app state
        this.store.dispatch({ type: UPDATE_USER, payload: user });

        this.messageService.success("User info saved.");
      })
      .share();
  }

  changePassword(currentPassword: string, newPassword: string) {

    return this.apiService
      .apiPost('/api/user/password', { "current": currentPassword, "new": newPassword }, true)
      .map((response) => {
        this.messageService.success("Password has been updated.");
      })
      .share();

  }

  updateAvatar(formData:FormData) {
    return this.apiService.apiPostFile('/api/user/avatar', formData)
      .map((response) => {

        // create user object
        let user = new User();
        user.makeFromApiData(response);

        // save to app state
        this.store.dispatch({ type: UPDATE_USER, payload: user });

        this.messageService.success("User image saved.");
      })
      .share();
  }
}

export const USER_PROVIDERS: Array<any> = [
  UserService
];
