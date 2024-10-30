import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  selected: boolean;
}

interface Store {
  name: string;
  selected: boolean;
  products: Product[];
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectAll = false;
  cartStores: Store[] = [
    {
      name: 'Toko Cosplay Jaya',
      selected: false,
      products: [
        {
          name: 'Costum Naruto',
          image: '/assets/product/kostum-1.png',
          size: 'M',
          price: 10000000,
          quantity: 1,
          selected: false
        },
        {
          name: 'Kostum Naruto',
          image: '/assets/product/kostum-2.png',
          size: 'L',
          price: 10000000,
          quantity: 1,
          selected: false
        }
      ]
    },
    {
      name: 'Raja Cosplay',
      selected: false,
      products: [
        {
          name: 'Kostum Naruto',
          image: '/assets/product/kostum-3.png',
          size: 'S',
          price: 10000000,
          quantity: 1,
          selected: false
        }
      ]
    }
  ];

  costumes = [
    {
      name: 'Costum Naruto',
      price: 100000,
      rating: 4.8,
      totalRent: 169,
      shopName: 'RajaCosplay',
      city: 'Jakarta Selatan',
      image: '/assets/product/kostum-1.png'
    },
    {
      name: 'Sixth Path Naruto',
      price: 150000,
      rating: 4.9,
      totalRent: 200,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-2.png'
    },
    {
      name: 'Kostum Naruto',
      price: 200000,
      rating: 4.9,
      totalRent: 124,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-3.png'
    },
    {
      name: 'Kostum Naruto',
      price: 70000,
      rating: 4.9,
      totalRent: 69,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-4.png'
    },
    {
      name: 'Kostum Naruto',
      price: 300000,
      rating: 4.9,
      totalRent: 70,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-5.png'
    },
    {
      name: 'Kostum Naruto',
      price: 100000,
      rating: 4.9,
      totalRent: 24,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-6.png'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  updateQuantity(product: Product, change: number) {
    product.quantity += change;
    // if (product.quantity <= 0) {
    //   this.removeProduct(product);
    // }
  }

  // removeProduct(product) {
  //   // Logika untuk menghapus produk dari keranjang
  // }

  // checkout() {
  //   // Logika untuk melakukan checkout
  // }

  get totalPrice() {
    return this.cartStores.reduce((total, store) => {
      return total + store.products.reduce((subTotal, product) => {
        return subTotal + (product.selected ? product.price * product.quantity : 0);
      }, 0);
    }, 0);
  }

}
