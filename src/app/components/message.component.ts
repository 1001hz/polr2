import { Component } from '@angular/core';
import { MessageService } from '../services';
import { Message } from '../models/message.model';

@Component({
  selector: 'message',
  template: `
    <ul>
      <li *ngFor="let message of messages">{{ message.text }}</li>
    </ul>
  `
})
export class MessageComponent {

  public messages: Array<Message>;

  constructor(private messageService: MessageService) {
    messageService.messages.subscribe( (messages: Array<Message>) => {
      this.messages = messages;
    });
  }
}
