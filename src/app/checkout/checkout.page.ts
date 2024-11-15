import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { RajaOngkirService } from '../raja-ongkir.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  resp:any
  userData:any
  asalProvinsi: any;
  provinsiTujuan: any;
  provinces:any
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
  costData:any
  listKotaAsal:any
  listKotaTujuan:any
  id:any
  selectedServiceName:any
  selectedService:any
  costume: any
  selectedServicePrice:any
  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService, private rajaOngkirService: RajaOngkirService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['costumeID']
    console.log(this.id)
    this.api.get('verifytoken').subscribe((resp)=> {
      console.log(resp)
      this.resp = resp
      if(this.resp.code == "200") {
        this.userData = this.resp
        this.api.getCostumesById('costume/', this.id).subscribe((resp)=> {
          this.costume = resp
          console.log("ini costume")
          console.log(this.costume)
        })
        this.fetchProvinces();
      } else {
        this.router.navigate(['/profile'])
      }
    })
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
        this.costData = this.resp.data;
        console.log(this.costData);
      } else {
        console.log(this.resp)
        console.error('Failed to get shipping cost');
      }
    });
  }

  get totalSewa() {
    const costumePrice = this.costume?.data?.price || 0;
    const courierPrice = this.selectedCourier?.cost?.[0]?.value || 0;
    const applicationFee = 1000;
    return costumePrice + courierPrice + applicationFee;
  }
}
