import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.page.html',
  styleUrls: ['./verificationcode.page.scss'],
})
export class VerificationcodePage implements OnInit {
  code: string[] = ['', '', '', '', '']; // Array to hold each digit of the code
  resp:any
  request:any={
    code:''
  }

  constructor(
    public api: ApiService, 
    public router: Router, 
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();


    const verificationCode = this.code.join('');
    console.log('Verification Code:', verificationCode);

    if (verificationCode != ""){
      this.request.code = verificationCode

    this.api.sendVerificationCode('userverification',this.request).subscribe(async(resp)=>{
      this.resp = resp

      if(this.resp.code == "200"){
        await loading.dismiss()
        await this.presentAlert("Verification process success")
        setTimeout(() => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }, 2000);
      } else {
        if (this.resp.data == "verification code expired"){
          await loading.dismiss()
          await this.presentAlert("Verification code expired")
        } else {
          await loading.dismiss()
          await this.presentAlert("Wrong verification code")
        }
      }
    })
    } else {
      await loading.dismiss()
      await this.presentAlert("Please input verification code")
    }
  }

  goToRegister(){
    this.router.navigate(['register'])
  }
}
