import { Component, OnDestroy } from '@angular/core';
import { LeagueService } from '../../../services';
import { League } from '../../../models/league.model';
import { Observable } from 'rxjs/Rx';

@Component(
  {
    template: `
    <h1>Leagues</h1>
    <table class="table">
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
  <tr *ngFor="let league of leagues$ | async">
  <td><a routerLink="./{{league._id}}"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          {{ league.name }}
        </a></td>
  </tr>
  </tbody>
  </table>
    `,
    selector: '<league-list></league-list>'
  }
)
export class LeagueListComponent {

  private leagues$: Observable<Array<League>>;

  constructor(private leagueService: LeagueService){
    this.leagues$ = this.leagueService.getAll();
  }

}
