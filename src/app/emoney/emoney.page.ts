import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

// Define the Transaction interface
interface Transaction {
  type: string;
  time: string; // Time should be in a format that can be parsed
  amount: number;
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

  transaction:any = [{
    transaction_type : "",
    transaction_date: "",
    transaction_amount: 0,
  }]

  transactions = [
    { type: 'Transfer', time: '2023-11-29T19:12:00', amount: 600000 }, // ISO 8601 format
    { type: 'Top Up', time: '2023-11-29T18:12:00', amount: 260000 },
    { type: 'Top Up', time: '2024-11-28T19:12:00', amount: 260000 },
]

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
}
