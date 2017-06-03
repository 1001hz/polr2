import { Component } from '@angular/core';
import { AuthService } from '../../../services';
import { User } from '../../../models/user.model';

@Component({
  template: `
    <h1>Manage Account</h1>
    <account-avatar></account-avatar>
    <p>Last login: {{ _user.lastLogin | date:'medium' }}</p>
    <account-details-form></account-details-form>
    <div>
      <a [routerLink]=" ['./password'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Change Password
      </a>
    </div>
  `
})
export class ManageAccountComponent{

  public _user: User;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {

      // set local user var
      this._user = user;
    });
  }
}
