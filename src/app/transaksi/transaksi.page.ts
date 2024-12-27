import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  costumes = [
    {
      id: 1,
      name: 'Costume Naruto',
      price: 10000000,
      size: 'M',
      paymentDeadline: new Date('2024-12-23T21:50:00'),
      pictures: ['../../assets/illustration/black.jpeg', '../../assets/illustration/black.jpeg'], // Add pictures array
    },
    {
      id: 2,
      name: 'Kostum Naruto',
      price: 5000000,
      size: 'L',
      paymentDeadline: new Date('2024-12-23T19:20:00'),
      pictures: ['../../assets/illustration/black.jpeg'], // Add pictures array
    },
    {
      id: 1,
      name: 'Costume Naruto',
      price: 10000000,
      size: 'M',
      paymentDeadline: new Date('2024-12-23T21:50:00'),
      pictures: ['../../assets/illustration/black.jpeg', '../../assets/illustration/black.jpeg'], // Add pictures array
    },
    {
      id: 2,
      name: 'Kostum Naruto',
      price: 5000000,
      size: 'L',
      paymentDeadline: new Date('2024-12-23T19:20:00'),
      pictures: ['../../assets/illustration/black.jpeg'], // Add pictures array
    },
    {
      id: 1,
      name: 'Costume Naruto',
      price: 10000000,
      size: 'M',
      paymentDeadline: new Date('2024-12-23T21:50:00'),
      pictures: ['../../assets/illustration/black.jpeg', '../../assets/illustration/black.jpeg'], // Add pictures array
    },
    {
      id: 2,
      name: 'Kostum Naruto',
      price: 5000000,
      size: 'L',
      paymentDeadline: new Date('2024-12-23T19:20:00'),
      pictures: ['../../assets/illustration/black.jpeg'], // Add pictures array
    },
  ];

  constructor(public router: Router) {}

  ngOnInit() {}

  gohome() {
    this.router.navigate(['/home']); // Adjust the route as needed
  }

  viewPayment() {
    this.router.navigate(['/selesaikan-transaksi']);
  }
}
