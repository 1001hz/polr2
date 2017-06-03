import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'nav-menu',
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Login
      </a>
      <a [routerLink]=" ['./signup'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Signup
      </a>
      <div *ngIf="(user | async)?._id">
        <a [routerLink]=" ['./app'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Home
        </a>
        <a [routerLink]=" ['./app/account'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Account
        </a>
        <a [routerLink]=" ['./app/league/new'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          New League
        </a>
        <a [routerLink]=" ['./app/league/join'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Join League
        </a>
      </div>
    </nav>
  `
})
export class NavMenuComponent{

  public user: Observable<User>;

  constructor(private authService: AuthService) {
    this.user = authService.user;
  }
}
