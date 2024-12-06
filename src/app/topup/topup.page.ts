import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  constructor(private router: Router, public api: ApiService, private alertController: AlertController) { }

  resp:any
  redirecturl:any
  data : any = {
    Emoney_amount:0
  }


  ngOnInit() {
  }

  goToPayment(){
    this.api.SendTopUpOrder('topup',this.data).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.redirecturl = this.resp.data.redirect_url
        console.log(this.redirecturl)
        this.router.navigate(['/topup-payment'],
          {
            state: {
              data: this.resp.data.redirect_url,
              data1: this.resp.data.order_id
            }
          }
        )
        //window.open(this.redirecturl,'_blank')
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
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
