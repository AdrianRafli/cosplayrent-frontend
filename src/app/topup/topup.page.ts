import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  constructor(
    private router: Router, 
    public api: ApiService, 
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  resp:any
  redirecturl:any
  data : any = {
    Emoney_amount:0
  }
  isSubmitting = false;


  ngOnInit() {
  }

  async goToPayment(){
    if (this.isSubmitting) return; // Cegah klik ganda
    this.isSubmitting = true;
    
    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.api.SendTopUpOrder('topup',this.data)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.redirecturl = this.resp.data.redirect_url
        console.log(this.redirecturl)
        await this.router.navigate(['/topup-payment'],
          {
            state: {
              data: this.resp.data.redirect_url,
              data1: this.resp.data.order_id
            }
          }
        )
        await loading.dismiss();
        //window.open(this.redirecturl,'_blank')
      }
      this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }
  

  goToEMoney(){
    this.router.navigate(['/emoney'])
          .then(() => {
      window.location.reload();
    });
  }
}
