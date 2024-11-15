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
    this.fetchProvinces();
  }

  fetchProvinces() {
    this.rajaOngkirService.getProvinces('provinces').subscribe((resp) => {
      this.resp = resp;
      console.log(this.resp);
      if (this.resp.code == 200) {
        this.provinces = this.resp.data;
      } else {
        console.error('Failed to load provinces');
      }
    });
  }

  fetchCity() {
    this.rajaOngkirService.getCity('city/', this.asalProvinsi).subscribe((resp) => {
      this.resp = resp;
      console.log(this.resp);
      if (this.resp.code == 200) {
        this.listKotaAsal = this.resp.data;
      } else {
        console.error('Failed to load city');
      }
    });
  }

  fetchTujuanCity() {
    this.rajaOngkirService.getCity('city/', this.provinsiTujuan).subscribe((resp) => {
      this.resp = resp;
      console.log(this.resp);
      if (this.resp.code == 200) {
        this.listKotaTujuan = this.resp.data;
      } else {
        console.error('Failed to load city');
      }
    });
  }

  onAsalProvinsiChange() {
    this.fetchCity();
    console.log('fetchAsal');
  }

  onTujuanProvinsiChange() {
    this.fetchTujuanCity();
    console.log('fetchTujuan');
  }

  doOrder() {
    this.orderRequest.origin = this.asalKota;
    this.orderRequest.destination = this.kotaTujuan;
    this.orderRequest.weight = this.selectedWeight;
    this.orderRequest.courier = this.selectedCourier;

    this.rajaOngkirService.postOrder('cekongkir', this.orderRequest).subscribe((resp) => {
      this.resp = resp;
      console.log(this.resp);
      if (this.resp.code == 200) {
        this.costData = this.resp.data; // Store the result in costData
        console.log(this.costData);
      } else {
        console.error('Failed to get shipping cost');
      }
    });
  }
}
