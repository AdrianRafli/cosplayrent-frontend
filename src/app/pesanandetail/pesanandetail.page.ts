import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from "@ionic/angular";
import { Location } from '@angular/common';

interface NavigationState {
  data: string;   
}

@Component({
  selector: 'app-pesanandetail',
  templateUrl: './pesanandetail.page.html',
  styleUrls: ['./pesanandetail.page.scss'],
})
export class PesanandetailPage implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    public api:ApiService, 
    private alertController: AlertController,  
    private location: Location,
    private loadingCtrl: LoadingController,
  ) { }

  id:any
  resp:any
  order: any = {
    costume_picture: "",
    costume_name:"",
    costume_price:0,
    costume_size:"",
    costumer_name: "",
    costumer_address: "",
    costumer_origin_province: "",
    costumer_origin_city: "",
    costumer_identity_card: "",
  };

  orderResponseClient:any = {
    status_order:'',
    description:'',
  }
  status:any

  description:any

  nomorresi:any

  isSubmitting = false;
  

  ngOnInit() {
    const navigation = this.location.getState() as NavigationState;
    this.status = navigation.data
    console.log(this.status)
    this.id = this.route.snapshot.params['id']
    this.api.getOrderDetailByOrderId('orderdetail/',this.id).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.order = this.resp.data
      }
    })
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async doAccept(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.orderResponseClient.status_order = "Proses"
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        await this.router.navigate(['/pesanan'])
        await loading.dismiss();
        window.location.reload();
      }
      this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  async doFinish(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.orderResponseClient.status_order = "Selesai"
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        await this.router.navigate(['/pesanan'])
        await loading.dismiss();
        window.location.reload();
      }
      this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  async doKembalikan(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.orderResponseClient.status_order = "Dikembalikan (Penyedia Sewa)"
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        await this.router.navigate(['/pesanan'])
        await loading.dismiss();
        window.location.reload();
      }
      this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  async doReject(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.orderResponseClient.status_order = "Dibatalkan"
    this.orderResponseClient.description = this.description
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        await this.router.navigate(['/pesanan'])
        await loading.dismiss();
        window.location.reload();
      }
      this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  

  doShipping(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    this.orderResponseClient.status_order = "Dikirim (Penyedia Sewa)"
    this.orderResponseClient.description = this.description
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.router.navigate(['/pesanan'])
          .then(() => {
            window.location.reload();
          });
      }
      this.isSubmitting = false;
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

  goToPesanan(){
    this.router.navigate(['/pesanan'])
          .then(() => {
            window.location.reload();
          });
  }

}
