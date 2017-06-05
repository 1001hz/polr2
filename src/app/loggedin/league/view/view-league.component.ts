import { Component, OnDestroy } from '@angular/core';
import { LeagueService, AuthService } from '../../../services';
import { League } from '../../../models/league.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  template: `
    <h1>{{ (league$ | async).name }}</h1>
    <div *ngIf="isOwner">
      <a routerLink="../../league/edit/{{ (league$ | async)._id }}"
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Edit {{ (league$ | async).name }}
      </a>
    </div>

    <div>
    Next round closing: {{ (league$ | async).clientProps.nextRoundClosing }} ({{ (league$ | async).clientProps.nextRoundClosingIn }})
    </div>
  `
})
export class ViewLeagueComponent implements OnDestroy{

  public league$: Observable<League>;
  public isOwner$;
  public isOwner;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService) {

    route.params.subscribe( params => {
      this.league$ = this.leagueService.getById(params['leagueId']);
      this.isOwner$ = this.leagueService.isOwner(params['leagueId']).first().subscribe( isOwner => this.isOwner = isOwner );
      });
  }

  ngOnDestroy() {
    this.isOwner$.unsubscribe();
  }
}
