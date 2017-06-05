import { Component } from '@angular/core';

@Component({
  template: `
    <h1>Edit League</h1>
    <button (click)="removeLeague()">Delete</button>
    <edit-league-form></edit-league-form>
  `
})
export class EditLeagueComponent{
  
  constructor() {

  }

  removeLeague() {

  }
}
