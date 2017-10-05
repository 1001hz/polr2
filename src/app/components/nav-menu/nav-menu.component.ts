import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'nav-menu',
  template: `
    <nav class="navbar navbar-inverse bg-inverse navbar-toggleable-md">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand" href="#">Navbar</a>

      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <a class="btn btn-sm align-middle btn-outline-secondary" [routerLink]=" ['./'] ">
              Login
            </a>
          </li>
          <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <a class="btn btn-sm align-middle btn-outline-secondary" [routerLink]=" ['./signup'] ">
              Signup
            </a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown" *ngIf="(user | async)?._id">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Leagues
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" [routerLink]=" ['./app/league'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                Leagues
              </a>
              <a class="dropdown-item" [routerLink]=" ['./app/league/new'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                New League
              </a>
              <a class="dropdown-item" [routerLink]=" ['./app/league/join'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                Join League
              </a>
            </div>
          </li>


          <li class="nav-item dropdown" *ngIf="(user | async)?._id">
            <a class="nav-link dropdown-toggle" id="navbarDropdownAccountLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Account
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdownAccountLink">
              <a class="dropdown-item" [routerLink]=" ['./app/account'] "
                routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
                Manage
              </a>
            </div>
          </li>

        </ul>
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
