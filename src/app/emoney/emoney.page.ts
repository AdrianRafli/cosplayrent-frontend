import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

interface Transaction {
  transaction_type: string;
  transaction_date: string; 
  transaction_amount: number;
}

@Component({
  selector: 'app-emoney',
  templateUrl: './emoney.page.html',
  styleUrls: ['./emoney.page.scss'],
})
export class EmoneyPage implements OnInit {
 
  username = "User123";
  emoney = 0; // Example initial value
  resp:any
  Token:any

  transaction: Transaction[] = [
    {
      transaction_type: "",
      transaction_date: "",
      transaction_amount: 0,
    },
  ];

  constructor(private router: Router, public api: ApiService){
    this.api.getUserDetail('userdetail').subscribe((resp) => {
      this.resp = resp
      
      if (this.resp.code == "200"){
        this.username = this.resp.data.name
      }
    })
  }
  

  ngOnInit() {
    this.api.getBalance('emoney').subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        this.emoney = this.resp.data.emoney_amount
      }
    })

    this.api.getHistoryBalance('emoneyhistory').subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        this.transaction = this.resp.data
      }
    })
    // Sort transactions by date and time in descending order
    
  }

  // this.transactions.sort((a, b) => {
  //   const dateA = new Date(a.time).getTime();
  //   const dateB = new Date(b.time).getTime();

  //   // First compare by date
  //   if (dateB !== dateA) {
  //     return dateB - dateA; // Sort by date descending
  //   }

  //   // If dates are the same, compare by time
  //   return dateB - dateA; // This will also sort by time since we are using the same date comparison
  // });

  

  goToHome(){
    this.router.navigate(['/home'])
  }

  goToTopUp() {
    this.router.navigate(['/topup'])
    // window.open('https://app.sandbox.midtrans.com/snap/v4/redirection/ff0385f4-1b3f-4df1-a703-7f33a7f2bea7', '_blank');
  } 

  goToEmoneyHistory(){
    this.router.navigate(['emoney-history'])
  }

  goToWishlist(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['/wishlist'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }

  goToOrder(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['/order'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }

  goToLoginOrProfile(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['profile'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }

}