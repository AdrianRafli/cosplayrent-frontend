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
  emoney = 0;
  total = 0
  isSubmitting = false;
  condition:any

  ngOnInit() {
    this.condition = "Topup Order"
    this.api.getBalance('emoney').subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        this.emoney = this.resp.data.emoney_amount
      }
    })
  }

  setTopUpAmount(amount: number) {
    this.data.Emoney_amount = amount;
  }

  getTotal() {
    this.total = this.data.Emoney_amount + 3000;
    return this.total;
  }

  async goToPayment(){
    if (this.isSubmitting) return; // Cegah klik ganda
    this.isSubmitting = true;
    
    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    // ini masih salah
    this.data.Emoney_amount = this.total;

    this.api.SendTopUpOrder('topup',this.data)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.redirecturl = this.resp.data.redirect_url
        console.log(this.redirecturl)
        await loading.dismiss();
        await this.router.navigate(['/selesaikan-transaksi'],
          {
            state: {
              data: this.resp.data.redirect_url,
              data1: this.resp.data.order_id,
              data2:this.data.Emoney_amount,
              data3:this.resp.data.midtrans_expired_time,
              data4: this.condition,
              data5: this.resp.data.midtrans_created_at
            }
          }
        )
      } else {
        await loading.dismiss();
        this.presentAlert(this.resp.data)
      }
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