import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function userReducer(state: User = new User(), action: Action = null) {
  switch (action.type) {
    case SET_USER:
      return Object.assign(new User(), state, action.payload );

    case RESET_USER:
      return new User();

    case UPDATE_USER:
      return Object.assign(new User(), state, action.payload );

    default:
      return state;
  }
}
