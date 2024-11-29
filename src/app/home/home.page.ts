import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  categories = ['One Piece', 'Jujutsu Kaisen', 'Naruto', 'Gintama', 'Neon Genesis Evangelion', 'Demon Slayer', 'AOT'];

  userData: any = {
    name:'',
    email:'',
  }
  
  Token:any

  query: string = ''
  resp:any;

  costume: any[] = []
  filteredCostume : any[] = []

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.get('verifytoken').subscribe((resp)=> {
      // console.log("login", resp)
      this.resp = resp

      if(this.resp.code == "200") {
        this.userData.name = this.resp.data.name
      }})

    this.api.getCostumes('costume').subscribe((resp)=>{  
      this.resp = resp
      if(this.resp.code == "200") {
        this.costume = this.resp.data
        console.log(this.costume)
      }
    })
  }

  // goToCostumeDetail(costumeId:number){
  //   this.router.navigate(['/product-detail', costumeId]);
  // }
  
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
  goToCostumeDetail(costumeId:number){
    this.router.navigate(['/detail-product', costumeId]);
  }
  goToWishlist(){
    this.router.navigate(['/wishlist']);
  }
  goToOrder(){
    this.router.navigate(['/order']);
  }

    // this.api.get('user').subscribe((resp: any) => {
    //   if (resp && resp.success) {
    //     this.userData = resp.user;
    //     console.log(localStorage.getItem('userToken'));
    //     console.log(this.userData);
    //   } else {
    //     console.error('User data not found');
    //     console.log(localStorage.getItem('userToken'));
    //     console.log(this.userData);
    //   }
    // },
    // (error) => {
    //   console.error('Error fetching user data', error);
    // });
}
