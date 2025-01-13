import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  costume: any[] = []; // Array of costumes
  resp: any;
  timers: any = {}; // Object to store timers for each costume by ID

  constructor(private router: Router, public api: ApiService) {}

  ngOnInit() {
    this.api.getTransactionPayment('order/payment').subscribe((resp) => {
      this.resp = resp;

      if (this.resp.code == "200") {
        console.log(this.resp.data);
        this.costume = this.resp.data
        this.costume.forEach((item:any)=> {
          this.startCountdownForAll(item)
        })
      }
    });
  }

  startCountdownForAll(item: any) {
    const expirationDate = new Date(item.midtrans_expired_time); // The expiration date
    let currentDate = new Date(item.midtrans_created_at); // Initial reference date
    const actualStartTime = new Date(); // The actual current time

    // Adjust currentDate to reflect the actual starting point
    const timeDifference = actualStartTime.getTime() - currentDate.getTime();
    currentDate = new Date(currentDate.getTime() + timeDifference);

    const interval = setInterval(() => {
        const remainingTime = expirationDate.getTime() - currentDate.getTime(); // Time difference in milliseconds

        if (remainingTime <= 0) {
            clearInterval(interval); // Stop the countdown when expired
            item.countdown = 'Expired';
        } else {
            // Calculate hours, minutes, seconds
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);

            // Format as HH:mm:ss
            item.countdown = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        }

        // Increment currentDate by 1 second
        currentDate = new Date(currentDate.getTime() + 1000);
    }, 1000); // Update every second
  }

  // Helper function to add leading zero to numbers < 10
  padZero(num: number): string {
      return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy() {
    // Clear all timers when the component is destroyed
    for (const timerId in this.timers) {
      clearInterval(this.timers[timerId]);
    }
  }

  gohome() {
    this.router.navigate(['/home']); // Adjust the route as needed
  }

  viewPayment(paymentid:number) {
    this.router.navigate(['/selesaikan-transaksi-order',paymentid]);
  }

  // Start countdown for all costumes
  
}
