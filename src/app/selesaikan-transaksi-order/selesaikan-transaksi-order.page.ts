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
  statuspayment:any
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
        this.startCountdownForAll(this.transaksi)
      }
    })
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startCountdownForAll(item:any) {
    const expirationDate = new Date(item.midtrans_expired_time); // The expiration date
    const interval = setInterval(() => {
      const now = new Date(); // Current time
      const remainingTime = expirationDate.getTime() - now.getTime(); // Time difference in milliseconds

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
    this.receivedData = null;
    this.receivedData1 = null;
    this.receivedData2 = null;
    this.countdown = '00:00:00';
    this.paymentMethod = 'BCA Virtual Account';
    this.paymentTo = '';
    this.totalAmount = 0;
    if (this.timer) {
      clearInterval(this.timer);
    }

    // Navigate to the 'transaksi' page
    this.router.navigate(['/home']).then(() => {
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
    if (this.receivedData4 == "Topup Order"){
      this.api.getTopUpOrderStatus('checktopuporder/', this.receivedData1).subscribe(async(resp) => {
        this.resp = resp
  
        if (this.resp.code == "200"){
          console.log(this.resp)
          await loading.dismiss();
          if (this.resp.data.top_up_order_status_payment == "Paid") {
            console.log(this.resp.data.top_up_order_status_payment)
            this.statuspayment = true
            setTimeout(() => {
              this.router.navigate(['/emoney']).then(() => {
                window.location.reload();
              });
            }, 1000); // Delay of 2000ms (2 seconds)
          } else{
            await loading.dismiss();
            console.log(this.resp)
            this.isSubmitting = false;
          }
        }
      },)
    }
    if (this.receivedData4 == "Order"){
      this.api.checkOrderStatus('checkorder/',this.receivedData1)
    .subscribe(
      async (resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        if (this.resp.data.status_payment ==  'Paid'){
          this.statuspayment = true
          console.log("Status payment is true")

          await loading.dismiss();
          setTimeout(() => {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }, 1000);

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

  copyToClipboard(url:any) {
    navigator.clipboard.writeText(url).then(() => {});
  }
}
