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
  resp:any
  costume:any=[]
  wishlistStatus:boolean=false

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.getAllWishlist('wishlist').subscribe((resp)=>{
      this.resp = resp
      if (this.resp.code == "200"){
        this.costume = this.resp.data
        this.wishlistStatus = true
      }
    })
  }

  removeFromWishlist(costumeid: number){
    this.api.deleteWishlist('wishlist/',costumeid).subscribe((resp)=>{
      this.resp = resp

      if (this.resp.code == "200"){
        window.location.reload()
      }
    })
  }

  goToHome(){
    this.router.navigate(['/home'])
  }
  goToOrder(){
    this.router.navigate(['/order']);
  }
  goToEmoney(){
    this.router.navigate(['/emoney']);
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
