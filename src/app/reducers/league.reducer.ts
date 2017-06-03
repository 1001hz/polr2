import { ActionReducer, Action } from '@ngrx/store';
import { League } from '../models/league.model';

export const ADD_LEAGUE = 'ADD_LEAGUE';
export const REMOVE_LEAGUE = 'REMOVE_LEAGUE';
export const DROP_LEAGUES = 'DROP_LEAGUES';
export const MODIFY_LEAGUE = 'MODIFY_LEAGUE';

export function leagueReducer(state: Array<League> = [], action: Action = null) {
  switch (action.type) {
    case ADD_LEAGUE:
      return [...state, action.payload];

    case REMOVE_LEAGUE:
      return state.filter(league => {
        if(action.payload !== league._id) {
          return league;
        }
      });

    case MODIFY_LEAGUE:
      return state.map( league => league._id === action.payload._id ? action.payload : league);

    case DROP_LEAGUES:
      return [];

    default:
      return state;
  }
}

//export const leagueSingleModel = (leagueId) => {
//  return state => state
//    .map((leagues) => {
//      // get single item from leagues array
//      return leagues.filter( (l) => {
//        return l._id === leagueId;
//      })[0];
//    })
//};
