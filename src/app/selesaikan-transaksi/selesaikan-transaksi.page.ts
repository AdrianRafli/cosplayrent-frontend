import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-selesaikan-transaksi',
  templateUrl: './selesaikan-transaksi.page.html',
  styleUrls: ['./selesaikan-transaksi.page.scss'],
})
export class SelesaikanTransaksiPage implements OnInit {
  countdown: string = '23:59:59';
  paymentMethod: string = 'BCA Virtual Account';
  paymentTo: string = '12345678912345';
  totalAmount: number = 100000;
  timer: any;

  constructor(private router: Router) {} // Inject Router

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    let time = 24 * 60 * 60; // 23 hours in seconds
    this.countdown = this.pad(0) + ':00:00'; // Initialize display to 23:00:00
  
    this.timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(this.timer);
        this.countdown = '00:00:00';
      } else {
        time--;
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        this.countdown = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
      }
    }, 1000);
  }
  

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  viewPaymentDetails() {
    console.log('Viewing payment details');
  }

  checkTransactionStatus() {
    console.log('Checking transaction status');
  }

  continueShopping() {
    console.log('Continuing shopping');
  }

  gotransaksi() {
    this.router.navigate(['/transaksi']); 
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.paymentTo).then(() => {
      console.log('Copied to clipboard: ' + this.paymentTo);
      alert('Nomor Virtual Account disalin: ' + this.paymentTo);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
