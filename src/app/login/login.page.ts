import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data:any = {email:'',password:''}
  resp:any
  successMessage: string = ''
  constructor(public api:ApiService, public router:Router, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['successMessage']) {
        this.successMessage = params['successMessage'];
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  doLogin() {
    // if (!this.data.email || !this.data.password) {
    //   // Jika form login kosong, tampilkan alert
    //   this.presentAlert('Email and password are required.');
    //   return;
    // }

    this.api.post('login', this.data).subscribe((resp)=> {
      // console.log("login", resp)
      this.resp = resp

      if(this.resp.code == 200) {
        localStorage.setItem('userToken', this.resp.data.token)
        this.router.navigateByUrl("/homepage")
      } else {
        this.presentAlert('Invalid email or password.');
      }
    }, (error) => {
      this.presentAlert('An error occurred. Please try again.');
    })
  }

  doLogout() {
    localStorage.removeItem('userToken')
  }
}
