import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-change',
  templateUrl: './profil-change.page.html',
  styleUrls: ['./profil-change.page.scss'],
})
export class ProfilChangePage implements OnInit {
  data: any = { name: 'test', email: 'test@gmail.com', username: 'testuser', password: '123', nomortlp: '0808080808' };

  constructor() { }

  ngOnInit() {
    this.data; 
  }

  dosave() {
    console.log('Updated Data:');
    console.log('Name:', this.data.name);
    console.log('Email:', this.data.email);
    console.log('Username:', this.data.username);
    console.log('Password:', this.data.password);
    console.log('Phone Number:', this.data.nomortlp);
    
  }
}
