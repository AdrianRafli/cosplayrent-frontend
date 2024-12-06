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

  status:any //default false
  resp:any
  costume:any = {
    available: '',
    bahan: '',
    berat: '',
    costume_picture: '',
    created_at: '',
    description: '',
    id: null,
    kategori: '',
    name: '',
    price: null,
    profile_picture: null,
    ukuran: '',
    updated_at: null,
    user_id: '',
    username: ''
}

  ngOnInit() {
    this.api.getSellerCostume('seller').subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.costume = this.resp.data
        this.status = true
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
}
