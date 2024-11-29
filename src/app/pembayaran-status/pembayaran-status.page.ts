import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pembayaran-status',
  templateUrl: './pembayaran-status.page.html',
  styleUrls: ['./pembayaran-status.page.scss'],
})
export class PembayaranStatusPage implements OnInit {

  isPaymentSuccess: boolean = true; // Status of payment, default is false

  constructor() { }

  ngOnInit() {
  }


  handlePayment() {
    if (this.isPaymentSuccess == false) {
      this.isPaymentSuccess = true; 
    } else {
      this.isPaymentSuccess = false;
    }
  }

  

}
