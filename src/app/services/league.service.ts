import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { League } from '../models/league.model';
import { ADD_LEAGUE, DROP_LEAGUES, MODIFY_LEAGUE, REMOVE_LEAGUE } from '../reducers/league.reducer';
import { ApiService } from './api.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import * as moment from 'moment';

interface AppState {
  league: League;
}

@Injectable()
export class LeagueService {

  public leagues: Subject<Array<League>> = new BehaviorSubject<Array<League>>(new Array<League>());

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  create(leagueFormData): any {

    leagueFormData.startDate = moment(leagueFormData.startDate + "T00:00:00", "YYYY-MM-DD").format("x");


    return this.apiService.apiPost('/api/league', leagueFormData, true)
      .map((response) => {
        let newLeague = new League();
        newLeague.makeFromApiData(response);

        this.store.dispatch({ type: ADD_LEAGUE, payload: newLeague });

        this.messageService.success("Your new league has been created");

        return response;
      })
      .share();

  }


  modify(leagueFormData): any {

    return this.apiService.apiPut('/api/league', leagueFormData, true)
      .map((response) => {
        let newLeague = new League();
        newLeague.makeFromApiData(response);

        this.store.dispatch({ type: MODIFY_LEAGUE, payload: newLeague });

        this.messageService.success("Your league has been modified");

        return response;
      })
      .share();

  }


  joinLeague(leagueCode): any {

    return this.apiService.apiPost('/api/league/join', {leagueCode: leagueCode}, true)
      .map((response) => {
        let newLeague = new League();
        newLeague.makeFromApiData(response);

        this.store.dispatch({ type: ADD_LEAGUE, payload: newLeague });

        this.messageService.success("You have successfully joined " + newLeague.name);

        return response;
      })
      .share();

  }

  fetchLeagues() {
    return this.apiService.apiGet('/api/leagues', true)
      .map((response) => {

        this.store.dispatch({ type: DROP_LEAGUES });

        response.map( league => {
          let newLeague = new League();
          newLeague.makeFromApiData(league);
          this.store.dispatch({ type: ADD_LEAGUE, payload: newLeague });
        });

        return response;
      })
      .share();
  }

  getAll(): Observable<Array<League>> {
    return this.store.select('leagues');
  }

  getById(leagueId): Observable<League> {

    return this.store.select('leagues')
      .map( (leagues: Array<League>) => {
      return leagues.find( (league: League) => {
        return league._id === leagueId;
      });
    })
  }

  isOwner(leagueId) : Observable<boolean> {

    return Observable.combineLatest(
      this.store.select('leagues'),
      this.authService.user,
      (leagues: Array<League>, user) => {

        // get league from array using passed in ID
        var league: League = leagues.find( (league: League) => {
          return league._id === leagueId;
        });

        return league.ownerId === user._id;
      });

  }

  remove(leagueId) {
    return this.apiService.apiDelete('/api/league/'+leagueId, true)
      .map(() => {
        this.store.dispatch({ type: REMOVE_LEAGUE, payload: leagueId });
        this.messageService.success("You have removed league with ID " + leagueId);
        return leagueId;
      })
      .share();
  }

}

export const LEAGUE_PROVIDERS: Array<any> = [
  LeagueService
];
