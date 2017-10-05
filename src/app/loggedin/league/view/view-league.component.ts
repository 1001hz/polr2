import { Component, OnDestroy } from '@angular/core';
import { LeagueService, AuthService } from '../../../services';
import { League } from '../../../models/league.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  template: `
    <h1>{{ (league$ | async).name }}</h1>
    <div *ngIf="isOwner">
      <a [routerLink]="['./edit']">
        Edit {{ (league$ | async).name }}
      </a>
    </div>

    <div *ngIf="!(league$ | async).active">
      This league has been deactivated
    </div>

    <div *ngIf="(league$ | async).source=='spotify'">
      <link-spotify-form></link-spotify-form>
    </div>

    <div *ngIf="(league$ | async).active">
        <div *ngIf="!(league$ | async).clientProps.hasStarted">
          League starts {{(league$ | async).startDate | date}}
        </div>

        <div *ngIf="(league$ | async).clientProps.hasStarted">
        Round {{ (league$ | async).clientProps.currentRoundNumber }} closing: {{ (league$ | async).clientProps.nextRoundClosing }} ({{ (league$ | async).clientProps.nextRoundClosingIn }})
        </div>

        <div>
          <button [routerLink]="['./pick']">
          Pick {{ (league$ | async).mediaType }} for round {{ (league$ | async).clientProps.currentRoundNumber }}</button>
          <div (click)="pick()">PICK</div>
        </div>
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
