import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toko-produk',
  templateUrl: './toko-produk.page.html',
  styleUrls: ['./toko-produk.page.scss'],
})
export class TokoProdukPage implements OnInit {

  products = [
    {
      name: 'Costume Naruto',
      price: '10.000.000',
      sizes: ['S', 'M', 'L', 'XL'],
      image: '../../assets/product/kostum-1.png',
    },
    {
      name: 'Costume Naruto',
      price: '10.000.000',
      sizes: ['S', 'M', 'L', 'XL'],
      image: '../../assets/product/kostum-2.png',
    },
    // Tambahkan produk lainnya
  ];

  resp:any
  data:any

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.get('verifytoken').subscribe((resp)=> {
      // console.log("login", resp)
      this.resp = resp

      if(this.resp.code == "200") {
        this.data = this.resp.data
      }
      else {
        this.router.navigate(['/home'])
      }
    })
    
    this.api.get('')
  }
}
