import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';




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
  

  constructor(private router: Router, private location: Location, public api: ApiService, private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {

    console.log('Location state:', this.location.getState());

    const navigation = this.location.getState() as NavigationState;

    if (navigation && navigation.data && navigation.data1) {
      this.receivedData = navigation.data;
      this.receivedData1 = navigation.data1;
      this.receivedData2 = navigation.data2;
      this.receivedData3 = navigation.data3;
      this.receivedData4 = navigation.data4;
      console.log('Received Data:', this.receivedData);
      console.log('Received Data1:', this.receivedData1);
      console.log('Received Data2:', this.receivedData2)
      console.log('Received Data3:', this.receivedData3)
      console.log('Received Data4:', this.receivedData4)
    } else {
      console.log('Failed to get navigation data');
    }
    this.fetchApiDate(this.receivedData3);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchApiDate(timeExpired:string) {
    this.startCountdown(timeExpired);
  }

  startCountdown(expirationTime: string) {
    // Transform the API expiration time to ISO format
    const targetTime = new Date(expirationTime.replace(' ', 'T'));

    // Start the countdown
    this.updateCountdown(targetTime);

    this.timer = setInterval(() => {
      this.updateCountdown(targetTime);
    }, 1000);
  }

  updateCountdown(targetTime: Date) {
    const now = new Date();
    const timeLeft = targetTime.getTime() - now.getTime();

    if (timeLeft <= 0) {
      clearInterval(this.timer);
      this.countdown = '00:00:00';
      return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    this.countdown = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
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

  copyToClipboard() {
    navigator.clipboard.writeText(this.receivedData).then(() => {});
  }
}
