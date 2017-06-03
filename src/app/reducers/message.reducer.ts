import { ActionReducer, Action } from '@ngrx/store';
import { Message } from '../models/message.model';

export const SET_MESSAGE = 'SET_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export function messageReducer(state: Array<Message> = [], action: Action = null) {
  switch (action.type) {
    case SET_MESSAGE:
      return [...state, action.payload];

    case REMOVE_MESSAGE:
      return state.filter(message => {
        if(action.payload !== message._id) {
          return message;
        }
      });

    default:
      return state;
  }
}
