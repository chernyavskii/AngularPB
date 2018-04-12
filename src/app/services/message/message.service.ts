import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];

  constructor() {
  }

  add(message: string) {
    const today = Date.now();
    this.messages.push(today + message);
  }

  clear() {
    this.messages = [];
  }
}
