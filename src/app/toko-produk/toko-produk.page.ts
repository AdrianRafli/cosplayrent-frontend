import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
