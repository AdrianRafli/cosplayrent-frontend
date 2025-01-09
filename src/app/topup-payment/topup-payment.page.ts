import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from "@ionic/angular";
import { Location } from '@angular/common';

interface NavigationState {
  data: string;  
  data1: string; 
}

@Component({
  selector: 'app-topup-payment',
  templateUrl: './topup-payment.page.html',
  styleUrls: ['./topup-payment.page.scss'],
})
export class TopupPaymentPage implements OnInit {

  constructor(
    private location: Location,
    public api: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController){ }

  resp:any
  receivedData: any;
  receivedData1: any;

  orderId :any = "6718ede6-475b-4eea-8fb8-21f9dae779cd"

  data : any = {
    Emoney_amount:0
  }
  redirecturl:any

  statuspayment:any

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  ngOnInit() {
    console.log('Location state:', this.location.getState());

    const navigation = this.location.getState() as NavigationState;
    
    if (navigation && navigation.data && navigation.data1) {
      this.receivedData = navigation.data;
      this.receivedData1 = navigation.data1;
      console.log('Received Data:', this.receivedData);
      console.log('Received Data1:', this.receivedData1);
    } else {
      console.log('Failed to get navigation data');
    }
  }

  goToTopup(){
    this.router.navigate(['/topup']);
  }

  doOrder(){
    window.open(this.receivedData,'_blank')
  }

  doCheckStatusOrder(){
    this.api.getTopUpOrderStatus('checktopuporder/', this.receivedData1).subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        if (this.resp.data.top_up_order_status_payment == "Paid") {
          console.log(this.resp.data.top_up_order_status_payment)
          this.statuspayment = true
          setTimeout(() => {
            this.router.navigate(['/emoney']).then(() => {
              window.location.reload();
            });
          }, 1000); // Delay of 2000ms (2 seconds)
        } 
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

  goToEmoney(){
    this.router.navigate(['/emoney'])
    .then(() => {
    window.location.reload();
});
  }
}
