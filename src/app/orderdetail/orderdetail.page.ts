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
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderdetailPage implements OnInit {

  constructor( 
    private location: Location,
    private router: Router, 
    private route: ActivatedRoute, 
    public api:ApiService, 
    private alertController: AlertController,
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
    shipment_notes:"",
  };

  orderResponseClient:any = {
    orderevent_status:'',
    orderevent_notes:'',
    shipment_receipt_user_id:'',
  }

  description:any
  status:any
  nomorresi:any
  isSubmitting = false;

  ngOnInit() {
    console.log('Location state:', this.location.getState());

    const navigation = this.location.getState() as NavigationState;
    this.status = navigation.data
    this.id = this.route.snapshot.params['id']
    this.api.getUserOrderDetail('userorder/',this.id).subscribe((resp) => {
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

  async doAccept() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
  
    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();
  
    this.orderResponseClient.orderevent_status = "Finish";
    this.orderResponseClient.description = this.description;
  
    this.api.sendOrderDetailClientResponse('orderevents/', this.id, this.orderResponseClient)
      .subscribe(
        async (resp) => {
          this.resp = resp;
  
          if (this.resp.code == "200") {
            console.log(this.resp);
  
            // Navigasi ke halaman order
            await this.router.navigate(['/order']);
  
            // Tutup loading setelah redirect
            await loading.dismiss();
  
            window.location.reload();          
          } else {
            await loading.dismiss();  // Tutup loading saat error
            this.presentAlert("An unexpected error occurred.");
          }
  
          this.isSubmitting = false;
        },
        async (error) => {
          await loading.dismiss();  // Tutup loading jika ada error
          const errormessage = error.error?.data || "An error occurred. Please try again.";
          this.presentAlert(errormessage);
          this.isSubmitting = false;
        }
      );
  }

  async doReject(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();

    this.orderResponseClient.orderevent_status = "Dibatalkan"

    this.api.sendOrderDetailClientResponse('orderevents/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
        this.resp = resp
        if (this.resp.code == "200"){
          console.log(this.resp)
          await this.router.navigate(['/order'])
          await loading.dismiss();
          window.location.reload();
        } else {
          await loading.dismiss();  // Tutup loading saat error
          this.presentAlert("An unexpected error occurred.");
        }
        this.isSubmitting = false;
    }, async (error) => {
      await loading.dismiss();
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
      this.isSubmitting = false;
    },)
  }

  async doTerima(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();

    this.orderResponseClient.orderevent_status = "Accepted"

    this.api.sendOrderDetailClientResponse('orderevents/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
        this.resp = resp
        if (this.resp.code == "200"){
          console.log(this.resp)
          await this.router.navigate(['/order'])

          // Tutup loading setelah redirect
          await loading.dismiss();

          // Reload halaman setelah loading dismissed
          window.location.reload();
        }
        else {
          await loading.dismiss();  // Tutup loading jika error
          this.presentAlert("An unexpected error occurred.");
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
      message: 'Processing...',
    });
    await loading.present();

    if (this.description != null && this.description.trim() !== "" &&  this.nomorresi != null && this.nomorresi.trim() !== ""){
      this.orderResponseClient.orderevent_status = "Return (Customer)"
      this.orderResponseClient.orderevent_notes = this.description
      this.orderResponseClient.shipment_receipt_user_id = this.nomorresi
      this.api.sendOrderDetailClientResponse('orderevents/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
        this.resp = resp
        if (this.resp.code == "200"){
          console.log(this.resp)
          await this.router.navigate(['/order'])

          // Tutup loading setelah redirect
          await loading.dismiss();

          window.location.reload();
        } else {
          await loading.dismiss();  // Tutup loading jika error
          this.presentAlert("An unexpected error occurred.");
        }
      this.isSubmitting = false;
    })
    } else {
      await loading.dismiss()
      this.presentAlert("Please input response and shipment receipt id")
      this.isSubmitting = false
    }
  }

  async doKembalikanKeSeller(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();    

    if (this.nomorresi != null && this.nomorresi.trim() !== ""){
      this.orderResponseClient.orderevent_status = "Shipping (Customer)"
      this.orderResponseClient.shipment_receipt_user_id = this.nomorresi
      this.api.sendOrderDetailClientResponse('orderevents/',this.id,this.orderResponseClient)
    .subscribe(
      async (resp) => {
        this.resp = resp
        if (this.resp.code == "200"){
          console.log(this.resp)
          await this.router.navigate(['/order'])

          // Tutup loading setelah redirect
          await loading.dismiss();

          // Reload halaman setelah loading dismissed
          window.location.reload();
        } else {
          await loading.dismiss();  // Tutup loading jika error
          this.presentAlert("An unexpected error occurred.");
        }
      this.isSubmitting = false;
    })
    } else {
      await loading.dismiss()
      this.presentAlert("Please input shipment receipt id")
      this.isSubmitting = false
    }
  }

}
