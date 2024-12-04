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
          console.log(this.resp)
        }
      })
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }

  goToTokoProduk(){
    this.router.navigate(['/toko-home-page'])
  }
  goToVerification(){
    this.router.navigate(['/verifikasi-user'])
  }

  removeToken(){
    this.router.navigate(['home'])
    localStorage.removeItem('userToken');
  }

}
