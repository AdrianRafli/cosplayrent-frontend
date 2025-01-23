import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


interface NavigationState {
  data: string;  // Adjust the type according to the data you are sending
  data1: string;    // Adjust the type accordingly
  data2: string;
  data3: string;
  data4: string;
}

@Component({
  selector: 'app-selesaikan-transaksi-order',
  templateUrl: './selesaikan-transaksi-order.page.html',
  styleUrls: ['./selesaikan-transaksi-order.page.scss'],
})
export class SelesaikanTransaksiOrderPage implements OnInit, OnDestroy {
  countdown: string = '00:00:00';
  paymentMethod: string = 'BCA Virtual Account';
  paymentTo: string = '12345678912345';
  totalAmount: number = 100000;
  timer: any;
  receivedData: any
  receivedData1: any
  receivedData2:any
  receivedData3:any
  receivedData4:any
  resp:any
  statuspayment:any = false
  isSubmitting:any
  paymentid:any
  transaksi:any  = []; 


  constructor(private router: Router,  private route: ActivatedRoute,private location: Location, public api: ApiService, private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.paymentid = this.route.snapshot.params['id']
    this.api.getTransactionPaymentInfo('order/payment/',this.paymentid).subscribe((resp)=>{
      this.resp = resp

      if (this.resp.code == "200"){
        this.transaksi = this.resp.data
        console.log(this.transaksi)
        if(this.transaksi.payment_status == 'Paid'){
          this.statuspayment = true
        }
        this.startCountdownForAll(this.transaksi.midtrans_expired_time,this.transaksi.midtrans_created_at)
      }
    })
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startCountdownForAll(item: any, item1: any) {
    const expirationDate = new Date(item); // The expiration date
    let currentDate = new Date(item1); // Initial reference date
    const actualStartTime = new Date(); // The actual current time

    // Adjust currentDate to reflect the actual starting point
    const timeDifference = actualStartTime.getTime() - currentDate.getTime();
    currentDate = new Date(currentDate.getTime() + timeDifference);

    const interval = setInterval(() => {
        const remainingTime = expirationDate.getTime() - currentDate.getTime(); // Time difference in milliseconds

        if (remainingTime <= 0) {
            clearInterval(interval); // Stop the countdown when expired
            this.countdown = 'Expired';
        } else {
            // Calculate hours, minutes, seconds
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);

            // Format as HH:mm:ss
            this.countdown = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        }

        // Increment currentDate by 1 second
        currentDate = new Date(currentDate.getTime() + 1000);
    }, 1000); // Update every second
  }

  // Helper function to add leading zero to numbers < 10
  padZero(num: number): string {
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
    // Reset the component state
    this.router.navigate(['/transaksi']).then(() => {
      window.location.reload();
    });
  }

  async goToCheckOrder(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();
    this.api.getTransactionPaymentInfo('order/payment/',this.paymentid)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        if (this.resp.data.payment_status ==  'Paid'){
          await loading.dismiss();
          this.statuspayment = true
          console.log("Status payment is true")
          setTimeout(() => {
            this.router.navigate(['/transaksi']).then(() => {
              window.location.reload();
            });
          }, 2000);

          this.isSubmitting = false;
        } else {
          await loading.dismiss();
          console.log("Payment status is false")
          this.isSubmitting = false;
        }
      } else {
        await loading.dismiss();
        console.log("Payment status is false")
        this.isSubmitting = false;
      }
    })
    }
  

  copyToClipboard(url:any) {
    navigator.clipboard.writeText(url).then(() => {});
  }
}
