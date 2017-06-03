import { Component } from '@angular/core';

@Component({
  template: `
  <h1>Manage Password</h1>
  <change-password-form></change-password-form>
  <div>
    <a [routerLink]=" ['../../account'] "
      routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
      Back to Account
    </a>
  </div>
  `
})
export class ManagePasswordComponent{}
