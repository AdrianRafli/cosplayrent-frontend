import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, SocketResponse } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  username: string = '';
  room: string = '';
  message: string = '';
  messages: SocketResponse[] = [];

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = prompt('Enter your name please:') || 'No name';
    this.room = prompt('Enter room name:') || 'default';
    this.chatService.initConnection(this.username, this.room);

    this.chatService.messages$.subscribe((messages) => {
      console.log('Messages updated:', messages);
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message); 
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.chatService.closeConnection();
  }

  goToChatList(){
    this.router.navigate(['/chat-list']);
  }
}
