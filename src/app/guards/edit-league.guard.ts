import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LeagueService } from '../services';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EditLeagueGuard implements CanActivate {

  constructor(
    private leagueService: LeagueService)
  {}

  canActivate(destination: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) : Observable<boolean> {

      return this.leagueService.isOwner(destination.params.leagueId);
  }
}

export const EDIT_LEAGUE_GUARD_PROVIDERS: Array<any> = [
  EditLeagueGuard
];
