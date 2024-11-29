import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  Token:any

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
  }


  goToHome(){
    this.router.navigate(['/home'])
  }
  goToOrder(){
    this.router.navigate(['/order']);
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
}
