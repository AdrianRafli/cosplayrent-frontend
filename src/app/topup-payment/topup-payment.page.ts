import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-topup-payment',
  templateUrl: './topup-payment.page.html',
  styleUrls: ['./topup-payment.page.scss'],
})
export class TopupPaymentPage implements OnInit {

  constructor( 
    public api: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController){ }

  resp:any

  orderId :any = "6718ede6-475b-4eea-8fb8-21f9dae779cd"

  data : any = {
    Emoney_amount:0
  }
  redirecturl:any

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Login Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  ngOnInit() {
  }

  doOrder(){
    console.log("hi")
    this.api.SendTopUpOrder('topup',this.data).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.redirecturl = this.resp.data.redirect_url
        console.log(this.redirecturl)
        window.open(this.redirecturl,'_blank')
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

  doCheckStatusOrder(){
    this.api.getTopUpOrderStatus('checktopuporder/', this.orderId).subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        console.log(this.resp.data.top_up_order_status_payment)
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

  goToEmoney(){
    this.router.navigate(['/emoney'])
  }
}
