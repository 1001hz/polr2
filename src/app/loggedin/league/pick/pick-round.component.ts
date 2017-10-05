import { Component } from '@angular/core';
import { LeagueService } from '../../../services';
import { League } from '../../../models/league.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  template: `
    <h1>Pick for round</h1>
    <search-spotify [media]="media"></search-spotify>
  `
})
export class PickRoundComponent {

  private media: string;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService) {

    route.params.subscribe( params => {

      this.leagueService.getById(params['leagueId']).subscribe( league => {

        // get what media type to search for based on the league
        this.media = league.mediaType;

      });

    });
  }
}
