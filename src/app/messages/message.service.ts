import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = []

  constructor() { }

  getMessages(): string [] {
    return this.messages
  }

  add(message: string){
    this.messages.push(message)
  }

  clear(): void {
    this.messages = [];
  }
}
