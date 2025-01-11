import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  Token:any

  query: string = ''
  resp:any;
  status:any
  order: any = {
    id: "",
    status_order: "",
    costume_id: 0,
    costume_name: "",
    costume_price: 0,
    costume_size: "",
    costume_picture: "",
    total: 0,
    updated_at: "",
  };

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.getUserOrder('alluserorder').subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.order = this.resp.data
        this.status = true
      }
    })
  }

  goToOrderDetail(id:any,status_order:any,costumeid:any){
    if (status_order == "Completed"){
      console.log('Order ID:', id);
      console.log('Costume ID:', costumeid);
      this.router.navigate(['/review'],
        {
          state: {
            data: id,
            data1: costumeid,
          }
        })
    }
    else{
      this.router.navigate(['/orderdetail',id],
      {
        state: {
          data: status_order,
        }
      })
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

  // navigasi
  goToHome(){
    this.router.navigate(['/home']);
  }
  goToReview(){
    this.router.navigate(['/review']);
  }

  goToEmoney(){
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      console.log('Token exists');
      this.router.navigate(['/emoney'])
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
  }
}
