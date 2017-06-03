import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { Message } from '../models/message.model';
import { SET_MESSAGE, REMOVE_MESSAGE } from '../reducers/message.reducer';

interface AppState {
  message: Message;
}

@Injectable()
export class MessageService {

  public messages: Subject<Array<Message>> = new BehaviorSubject<Array<Message>>(new Array<Message>());

  constructor(private store: Store<AppState>) {
    store.select('messages').subscribe( (messages:Array<Message>) => {
      this.messages.next(messages);
    } );
  }

  success(message) {
    let newMessage = new Message(message, "success");
    this.store.dispatch({ type: SET_MESSAGE, payload: newMessage });
    setTimeout(() => {
      this.store.dispatch({ type: REMOVE_MESSAGE, payload: newMessage._id });
    }, 4000);
  }
}

export const MESSAGE_PROVIDERS: Array<any> = [
  MessageService
];
