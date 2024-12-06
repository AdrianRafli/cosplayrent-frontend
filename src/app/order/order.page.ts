import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  Token:any

  query: string = ''
  resp:any;

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
  }

  goToLoginOrProfile(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['profile'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }

  // navigasi
  goToHome(){
    this.router.navigate(['/home']);
  }
  goToReview(){
    this.router.navigate(['/review']);
  }

  goToEmoney(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['/emoney'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }
}
