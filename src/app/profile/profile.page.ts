import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  Token:any
  resp:any
  data: any ={
    name:'',
    id:''
  }

  constructor(public api: ApiService, public router: Router) {}
  
  ngOnInit() {
    this.Token = localStorage.getItem('userToken')
   
    if (this.Token !== null && this.Token.trim() !== '') {
      this.api.getUserDetail('userdetail').subscribe((resp) => {
        this.resp = resp;
        if (this.resp.code == "200") {
          this.data = this.resp.data;
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  goToHome(){
    this.router.navigate(['/home'])
  }
  goToProfileChange(){
    this.router.navigate(['/profile-change'])
  }
  goToSandi(){
    this.router.navigate(['/ubah-sandi'])
  }
  goToTokoProduk(){
    this.router.navigate(['/toko-home-page'])
  }
  goToReview(){
    this.router.navigate(['/review-history'])
  }
  goToTransaksi(){
    this.router.navigate(['/review-history'])
  }
  goToVerification(){
    this.router.navigate(['/verifikasi-user'])
  }

  deleteAccount(){
    this.api.deleteAccount('useraccount').subscribe((resp) => {
      this.resp = resp;
      console.log(this.resp)
      if (this.resp.code == "200") {
        this.data = this.resp.data;
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        localStorage.removeItem('userToken');
      }
    })
  }

  removeToken(){
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    localStorage.removeItem('userToken');
  }

}
