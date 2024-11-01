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
  
  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToCostumeDetail(costumeId:number){
    this.router.navigate(['/detail-product', costumeId]);
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
