/**
 * Angular decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { AuthService } from './services';
import { Router } from '@angular/router';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <message></message>
    <nav-menu></nav-menu>
    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      FOOTER
    </footer>
  `
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    // try and login using local stored token
    let token = localStorage.getItem("polrtoken");
    if(token) {
      authService.tokenLogin(token)
        .subscribe(
        ( data ) => {
          this.router.navigate(['app']);
        }
      );
    }
  }

}
