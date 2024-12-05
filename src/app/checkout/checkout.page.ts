import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { RajaOngkirService } from '../raja-ongkir.service';
import { AlertController } from "@ionic/angular";

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
  asalKotaNama: any;
  provinsiTujuanNama:any
  kotaTujuanNama: any;
  selectedWeight: number = 0;
  selectedCourier: any = 'pos'
  orderRequest:any = {
    origin:'',
    destination:'',
    weight:'',
    courier:'',
  }
  orderToMidtransRequest:any = {
    seller_id:'',
    costume_id:0,
    costume_name:'',
    costume_category:'',
    costume_price:0,
    merchant_name:'',
    total:0
  }
  courierPrice:any
  costData:any
  listKotaAsal:any
  listKotaTujuan:any
  id:any
  selectedServiceName:any
  selectedService:any
  costume: any = {
    id: 0,
    user_id: "",
    username: "",
    profile_picture: "",
    name: "",
    description: "",
    bahan: "",
    ukuran: "",
    berat: 0,
    kategori: "",
    price: 0,
    kota_asal: "",
    costume_picture: "",
    available: "",
    created_at: "",
    updated_at: "",
  };
  
  selectedServicePrice:any
  cities:any
  selectedCityName: any
  selectedProvinceName:any
  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService, private rajaOngkirService: RajaOngkirService,  private alertController: AlertController,) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['costumeID']
    this.api.getUserDetail('userdetail').subscribe((resp)=> {
      // console.log(resp)
      this.resp = resp
      if(this.resp.code == "200") {
        this.userData = this.resp.data
        this.api.getCostumesById('costume/', this.id).subscribe((resp)=> {
          this.resp = resp
          this.costume = this.resp
          console.log(this.costume)
          this.selectedWeight = this.costume.data.berat
        })
        this.asalProvinsi = this.resp.data.origin_province_id
        this.asalKota = this.resp.data.origin_city_id
        this.fetchProvinces();
        this.fetchCity()
        this.api.getSellerAddress('selleraddress/checkout/',this.id).subscribe((resp) => {
          this.resp = resp
          if (this.resp.code =="200"){
            this.kotaTujuan = this.resp.data.seller_origin_city_id
            this.provinsiTujuanNama = this.resp.data.seller_origin_province_name
            this.kotaTujuanNama = this.resp.data.seller_origin_city_name
            this.doOrder()
          }
        })
      } else {
        this.router.navigate(['/profile'])
      }
    })
  }

  fetchProvinces() {
    this.rajaOngkirService.getProvinces('provinces').subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == 200) {
        this.provinces = this.resp.data;
        // console.log('Provinces loaded:', this.provinces);
      } else {
        console.error('Failed to load provinces');
      }
    });
  }

  onAsalProvinsiChange() {
    // console.log('Province changed to:', this.asalProvinsi);
  
    // Find the province name from the provinces list
    const selectedProvince = this.provinces.find((province: any) => province.province_id === this.asalProvinsi);
    if (selectedProvince) {
      this.selectedProvinceName = selectedProvince.province;
    }

    this.fetchCity(); // Fetch cities for the selected province
  }

  onCityChange() {
    const selectedCity = this.cities.find((city: any) => city.city_id === this.asalKota);
    if (selectedCity) {
      this.selectedCityName = selectedCity.city_name;
      this.kotaTujuan = selectedCity.city_id;
    }
    this.doOrder();
  }
  
  onCourierChange() {
    this.doOrder();
  }

  onServiceChange() {
    this.totalSewa
  }
  

  fetchCity() {
    if (!this.asalProvinsi) {
      console.error('Province ID is not set. Cannot fetch cities.');
      return;
    }
    this.rajaOngkirService.getCity('city/', this.asalProvinsi).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == 200) {
        this.cities = this.resp.data;
        // console.log('Cities loaded:', this.cities);
      } else {
        console.error('Failed to load cities');
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  doOrder() { 
    // console.log("This asal kota:", this.asalKota)
    // console.log("This kota tujuan:", this.kotaTujuan)
    this.orderRequest.origin = String(this.asalKota);
    this.orderRequest.destination = String(this.kotaTujuan);
    this.orderRequest.weight = this.selectedWeight;
    this.orderRequest.courier = this.selectedCourier;
    // console.log("asal:",this.orderRequest.origin)
    // console.log("tujuan:",this.orderRequest.destination)
    // console.log(this.orderRequest.weight)
    // console.log(this.orderRequest.courier)

    this.rajaOngkirService.postOrder('checkshippment', this.orderRequest).subscribe((resp) => {
      this.resp = resp;
      //console.log(this.resp);
      if (this.resp.code == 200) {
        this.costData = this.resp.data;
        // console.log(this.costData)
      } else {
        console.error('Failed to get shipping cost');
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },
  );
  }

  get totalSewa() {
    const costumePrice = this.costume?.data?.price || 0;
    this.courierPrice = this.selectedService?.cost?.[0]?.value || 0;
    const applicationFee = 3000;
  
    return costumePrice + this.courierPrice + applicationFee;
  }

  goToPayment(){
    if (this.courierPrice == 0) {
      this.presentAlert(
        "You need to choose pilih jasa first"
      );
    }
    console.log(this.totalSewa)
    this.orderToMidtransRequest.seller_id = this.costume.data.user_id
    this.orderToMidtransRequest.costume_id = this.costume.data.id
    this.orderToMidtransRequest.costume_name = this.costume.data.name
    this.orderToMidtransRequest.costume_category = this.costume.data.kategori
    this.orderToMidtransRequest.costume_price = this.costume.data.price
    this.orderToMidtransRequest.merchant_name = this.costume.data.username
    this.orderToMidtransRequest.total = this.totalSewa
    console.log(this.orderToMidtransRequest)
    this.api.createOrderDirectlyToMidtrans('order/midtrans',this.orderToMidtransRequest).subscribe((resp) => {
      this.resp = resp

      //   this.router.navigate(['/payment'],
      //     {
      //       state: {
              
      //       }
      //     }
      //   )
      // }

      if (this.resp.code == "200"){
        console.log(this.resp)
        this.router.navigate(['/payment'],
          {
            state: {
              data: this.resp.data.redirect_url,
              data1: this.resp.data.order_id
            }
          }
        )
      }
    })
  }
}


