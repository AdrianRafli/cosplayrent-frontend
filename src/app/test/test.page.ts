import { Component, OnInit } from '@angular/core';
import { RajaOngkirService } from '../raja-ongkir.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  provinces: any[] = [];
  resp: any;
  data: any;
  asalProvinsi: any;
  provinsiTujuan: any;
  asalKota: any;
  kotaTujuan: any;
  selectedWeight: any;
  selectedCourier: any;
  orderRequest:any = {
    origin:'',
    destination:'',
    weight:'',
    courier:'',
  }
  listKotaAsal:any
  listKotaTujuan:any

  // Add a variable to store the shipping cost data
  costData: any = [];

  constructor(private rajaOngkirService: RajaOngkirService) {}

  ngOnInit() {
  }

  searchQuery: string = '';

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search query:', this.searchQuery);
      // Add your search logic here
    }
  }
}
