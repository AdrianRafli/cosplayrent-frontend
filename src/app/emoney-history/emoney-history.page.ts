import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-emoney-history',
  templateUrl: './emoney-history.page.html',
  styleUrls: ['./emoney-history.page.scss'],
})
export class EmoneyHistoryPage implements OnInit {
  resp:any
  transaction: { 
    transaction_type: string; 
    transaction_date: string; 
    transaction_amount: number; 
  }[] = [];
  statusTransaction:boolean=false
  
  constructor(private router: Router, public api: ApiService){ 
   
  }

  ngOnInit() {
    this.api.getHistoryBalance('emoneyhistory').subscribe((resp) => {
      this.resp = resp

      if (this.resp.code == "200"){
        console.log(this.resp)
        this.transaction = this.resp.data
        this.statusTransaction= true
      }
    })
    
  }
}
