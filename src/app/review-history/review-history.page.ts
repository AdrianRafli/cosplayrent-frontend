import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.page.html',
  styleUrls: ['./review-history.page.scss'],
})
export class ReviewHistoryPage implements OnInit {

  selectTabs = 'menunggu';

  reviews:any=[]
  reviewedOrder:any=[]
  resp:any
  statusAllNonReviewed:boolean = false
  statusAllReviewed:boolean = false

  constructor(
    private router: Router,public api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getAllUserReview('userreview').subscribe((resp)=>{
      this.resp = resp
      
      if (this.resp.code == "200"){
        this.reviews = this.resp.data
        console.log(this.resp)
        this.statusAllNonReviewed = true
      } else {
        console.log(this.resp)
      }
    })

    this.api.getAllReviewedOrder('allreviewedorder').subscribe((resp)=>{
      this.resp = resp
      
      if (this.resp.code == "200"){
        this.reviewedOrder = this.resp.data
        console.log(this.resp.data)
        this.statusAllReviewed = true
      } else {
        console.log(this.resp)
      }

    })
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }
  goToReview(orderid:any,costumeid:any){
    this.router.navigate(['/review'],
      {
        state: {
          data: orderid,
          data1: costumeid,
        }
    })
  }
  goToDetail(orderid:any,costumeid:any){
    this.router.navigate(['/review'],
      {
        state: {
          data: orderid,
          data1: costumeid,
          data2:"riwayat",
        }
      })
  }
}
