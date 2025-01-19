import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //categories = ['One Piece', 'Jujutsu Kaisen', 'Naruto', 'Gintama', 'Neon Genesis Evangelion', 'Demon Slayer', 'AOT'];
  categories:any

  userData: any = {
    name:'',
    email:'',
  }
  
  Token:any

  query: string = ''
  resp:any;

  costume: any[] = []
  filteredCostume : any[] = []
  appversion:string = "0.7"

  constructor(private router: Router, public api: ApiService, private alertController: AlertController,) {
   }

   async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  ngOnInit() {
    this.api.getCostumes('costume').subscribe((resp)=>{  
      this.resp = resp
      if(this.resp.code == "200") {
        this.costume = this.resp.data
      }
    })

    this.api.getCategory('categories').subscribe((resp)=>{
      this.resp = resp

      if(this.resp.code == "200"){
        this.categories = this.resp.data
      }
    })

    this.api.getCheckApp('checkappversion').subscribe((resp)=> {
      this.resp = resp
      if(this.resp.code == "200"){
        if(this.appversion != "0.7"){
          this.presentAlert("Versi app tidak sama, mohon update aplikasinya");
        }
      }
    })
  }

  // goToCostumeDetail(costumeId:number){
  //   this.router.navigate(['/product-detail', costumeId]);
  // }
  
  goToLoginOrProfile(){
    this.Token = localStorage.getItem('userToken')
    console.log("woi")
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log("woi2")

      this.api.goMiddleware('middleware').subscribe(
        (resp) => {
          this.router.navigate(['profile'])
        },
        (error) => {
          console.log(this.resp.code)
          localStorage.removeItem('userToken');
          this.router.navigate(['/login'])
        }
      );      
    } else {
      this.router.navigate(['/login'])
    }
  }
  
  goToChatList(){
    this.router.navigate(['/chat-list']);
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToCostumeDetail(costumeId:number){
    this.router.navigate(['/detail-product', costumeId]);
  }
  goToWishlist(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      this.router.navigate(['/wishlist'])
    } else {
      this.presentAlert('Please login or register first')
    }
  }
  goToOrder(){
    this.Token = localStorage.getItem('userToken')
    console.log("woi")
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log("woi2")

      this.api.goMiddleware('middleware').subscribe(
        (resp) => {
          this.router.navigate(['order'])
        },
        (error) => {
          console.log(this.resp.code)
          localStorage.removeItem('userToken');
          this.presentAlert('Please login or register first')
        }
      );      
    } else {
      this.presentAlert('Please login or register first')
    }
  }
  goToEmoney(){
    this.Token = localStorage.getItem('userToken')
    console.log("woi")
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log("woi2")

      this.api.goMiddleware('middleware').subscribe(
        (resp) => {
          this.router.navigate(['emoney'])
        },
        (error) => {
          this.presentAlert('Please login or register first')
          console.log(this.resp.code)
          localStorage.removeItem('userToken');
        }
      );      
    } else {
      this.presentAlert('Please login or register first')
    }
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
