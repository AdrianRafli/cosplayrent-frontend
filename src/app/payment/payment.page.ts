import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';


// Define an interface for the expected state
interface NavigationState {
  data: string;  // Adjust the type according to the data you are sending
  data1: string;    // Adjust the type accordingly
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  receivedData: any;
  receivedData1: any;
  resp: any = {
    id: "",
    user_id: "",
    seller_id: "",
    costume_id: 0,
    shipping_id: 0,
    total: 0,
    status_payment: false,
    status_shipping: false,
    is_canceled: false,
    created_at: "",
    updated_at: "",
  };
  statuspayment:any
  isSubmitting = false;

  constructor(
    private location: Location, 
    private router: Router,  
    public api:ApiService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    // Log the location state to debug
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

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToMidtrans() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    window.open(this.receivedData, '_blank');
    
    this.isSubmitting = false;
  }

  async goToCheckOrder(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    this.api.checkOrderStatus('checkorder/',this.receivedData1)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        if (this.resp.data.status_payment ==  true){
          this.statuspayment = true
          console.log("Status payment is true")

          await this.router.navigate(['/home'])
          await loading.dismiss();
          window.location.reload();

          this.isSubmitting = false;
        } else {
          await loading.dismiss();
          console.log("Payment status is false")
          this.isSubmitting = false;
        }
      }
    })
  }
}
