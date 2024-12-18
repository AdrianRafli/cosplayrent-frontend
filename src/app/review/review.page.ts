import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  // sesuain sama database
  data: any = { id: '',  review_rating: '', review_picture: '', review_comment: ''};
  // Token:any

  // resp: any;

  rating = 0;

  isSubmitting = false; 

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() {
    // this.Token = localStorage.getItem('userToken')
    // if (this.Token !== null && this.Token.trim() !== '') {
    //   this.api.getUserDetail('userdetail').subscribe((resp) => {
    //     this.resp = resp;
    //     if (this.resp.code == "200") {
    //       this.data = this.resp.data;
    //       console.log(this.data);
    //     }
    //   })
    // } else {
    //   console.log('Token is empty or does not exist');
    //   this.router.navigate(['/login'])
    // }
  }

  // nilai rating disimpan di variable rating (number 1-5)
  setRating(value: number) {
    this.rating = value;
    console.log(this.rating);
  }

  goToOrder(){
    this.router.navigate(['/order']);
  }

  

}
