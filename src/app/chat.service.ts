import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SocketResponse {
  from: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private ws: WebSocket | undefined;
  private messagesSubject = new BehaviorSubject<SocketResponse[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private room: string | undefined;
  private username: string | undefined;

  constructor() {}

  initConnection(username: string, room: string): void {
    this.username = username;
    this.room = room;
    this.ws = new WebSocket(`ws://localhost:8080/ws?username=${username}&room=${room}`);

    this.ws.onopen = () => {
      console.log(`Connected to ${room}`);
      this.addMessage({ from: this.username!, message: `connected to ${room}` });
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data as string);

      const normalizedData: SocketResponse = {
        from: data.From || data.from,  
        message: data.Message || data.message
      };

      console.log('Received message:', normalizedData); 
      this.addMessage(normalizedData); 
    };

    this.ws.onclose = () => {
      console.log('Disconnected');
      this.addMessage({ from: this.username!, message: `disconnected` });
    };
  }

  sendMessage(message: string): void {
    if (this.ws) {
      console.log('Sending message:', message); 
      this.ws.send(JSON.stringify({ Message: message }));
      this.addMessage({ from: this.username!, message }); 
    }
  }

  private addMessage(message: SocketResponse): void {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);
  }

  closeConnection(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
