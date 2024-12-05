import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


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
  

  constructor(private location: Location, private router: Router,  public api:ApiService) {}

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
    window.open(this.receivedData, '_blank');
  }

  goToCheckOrder(){
    this.api.checkOrderStatus('checkorder/',this.receivedData1).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        if (this.resp.data.status_payment ==  true){
          console.log("Status payment is true")
        } else {
          console.log("Stauts payment is false")
        }
      }
    })
  }
}
