import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.page.html',
  styleUrls: ['./pesanan.page.scss'],
})
export class PesananPage implements OnInit {

  constructor(private router: Router, public api: ApiService) { }

  status:any
  resp:any
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
  

  ngOnInit() {
    this.api.getSellerOrder('order/seller').subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.order = this.resp.data
        this.status = true
        console.log("woi",this.status)
      } else {
        console.log(this.resp)
      }
    })
  }


  goToTokoHome(){
    this.router.navigate(['/toko-home-page']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToProduct(){
    this.router.navigate(['/toko-produk']).then(() => {
      window.location.reload();
    });
  }
  goToOrder(){
    this.router.navigate(['/pesanan']).then(() => {
      window.location.reload();
    });
  }
  goToProfile(){
    this.router.navigate(['/toko-home-page'])
  }

  goToOrderDetail(id:any, status_order:any){
    this.router.navigate(['/pesanandetail',id],
      {
        state: {
          data: status_order,
        }
      })
  }
}
