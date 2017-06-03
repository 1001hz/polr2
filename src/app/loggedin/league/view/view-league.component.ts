import { Component } from '@angular/core';
import { LeagueService, AuthService } from '../../../services';
import { League } from '../../../models/league.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  template: `
    <h1>{{ (league$ | async).name }}</h1>
    <div *ngIf="isOwner$ | async">
      <a routerLink="../../league/edit/{{ (league$ | async)._id }}"
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Edit {{ (league$ | async).name }}
      </a>
  </div>
    <div>
    Next round closing:
    </div>
  `
})
export class ViewLeagueComponent {

  public league$: Observable<League>;
  public isOwner$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService) {

    route.params.subscribe( params => {
      this.league$ = this.leagueService.getById(params['leagueId']);
      this.isOwner$ = this.leagueService.isOwner(params['leagueId']);
      });
  }
}
