import { Component } from '@angular/core';
import { LeagueService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <h1>Edit League</h1>
    <button (click)="removeLeague()">Delete</button>
    <edit-league-form [leagueId]="leagueId"></edit-league-form>
  `
})
export class EditLeagueComponent{

  public serverError: string;
  public leagueId: string;

  constructor(
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      // don't need to unsubscribe from this, happens automatically
    route.params.subscribe( params => {
      this.leagueId = params['leagueId'];
    });
  }

  removeLeague() {
    this.leagueService
      .remove(this.leagueId)
      .subscribe(
      ( leagueId ) => this.router.navigate(['app/league/']),
      ( error ) => this.serverError = error
    )

  }
}
