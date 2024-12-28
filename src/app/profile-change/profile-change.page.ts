import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';
import { RajaOngkirService } from '../raja-ongkir.service';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.page.html',
  styleUrls: ['./profile-change.page.scss'],
})
export class ProfileChangePage implements OnInit {
  data: any = { id: '', name: '', email: '', address: '', profile_picture: '', created_at: '', updated_at:'', origin_city_name:'', origin_province_name:'', };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  Token: any;
  staticusername: any;
  provinces: any;
  asalKota: any;
  asalProvinsi: any;
  error:any
  namaAsalKota:any
  namaAsalProvinsi:any
  cities: any;

  // New variables to store selected province and city names
  selectedProvinceName: any 
  selectedCityName: any 

  resp: any;

  isSubmitting = false;

  constructor(
    public api: ApiService, 
    public router: Router, 
    private alertController: AlertController, 
    private rajaOngkirService: RajaOngkirService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.Token = localStorage.getItem('userToken');
    if (this.Token !== null && this.Token.trim() !== '') {
      this.api.getUserDetail('userdetail').subscribe((resp) => {
        this.resp = resp;
        if (this.resp.code == "200") {
          this.data = this.resp.data;
          this.staticusername = this.resp.data.name;
  
          if (this.data.origin_province_id != null && this.data.origin_city_id != null){
            this.asalProvinsi = this.data.origin_province_id;
            this.asalKota = this.data.origin_city_id;
            this.namaAsalProvinsi = this.data.origin_province_name
            this.namaAsalKota = this.data.origin_city_name
            this.fetchProvinces();
            this.fetchCity();           
          } else {
            this.fetchProvinces();
          }
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }
  
  fetchProvinces() {
    this.rajaOngkirService.getProvinces('provinces').subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == 200) {
        this.provinces = this.resp.data;
      } else {
        console.error('Failed to load provinces');
      }
    });
  }

  onAsalProvinsiChange() {  
    // Find the province name from the provinces list
    const selectedProvince = this.provinces.find((province: any) => province.province_id === this.asalProvinsi);
    if (selectedProvince) {
      this.selectedProvinceName = selectedProvince.province;
    }

    this.fetchCity(); // Fetch cities for the selected province
  }

  onCityChange() {
    // Find the city name from the cities list
    const selectedCity = this.cities.find((city: any) => city.city_id === this.asalKota);
    if (selectedCity) {
      this.selectedCityName = selectedCity.city_name;
    }
  }

  fetchCity() {
    if (!this.asalProvinsi) {
      return;
    }
    this.rajaOngkirService.getCity('city/', this.asalProvinsi).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == 200) {
        this.cities = this.resp.data;
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Update Profile Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  validateFields(): boolean {
    const {name, email, password, profile_picture } = this.data;

    if (!name || name.length < 5 || name.length > 20) {
      this.presentAlert(
        "Username must be between 5 and 20 characters."
      );
      return false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk format email
    if (!email || email.length < 5 || email.length > 254 || !emailRegex.test(email)) {
      this.presentAlert(
        "Email must be between 5 and 254 characters and in a valid format."
      );
      return false;
    }

    // if (!address || address.length < 5 || address.length > 100) {
    //   this.presentAlert(
    //     "Address must be between 5 and 100 characters."
    //   );
    //   return false;
    // }

    return true;
  }

  async dosave() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
  
    if (!this.validateFields()) {
      this.isSubmitting = false;
      return;
    }
  
    // Show loading spinner
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();
  
    const formData = new FormData();
  
    // Append fields only if they have valid values
    if (this.data.name) {
      formData.append('name', this.data.name);
    }
  
    if (this.data.email) {
      formData.append('email', this.data.email);
    }
  
    if (this.data.address) {
      formData.append('address', this.data.address);
    }
  
    if (this.selectedProvinceName) {
      formData.append('origin_province_name', this.selectedProvinceName);
    } else if (this.namaAsalProvinsi) {
      formData.append('origin_province_name', this.namaAsalProvinsi);
    }
  
    if (this.asalProvinsi) {
      formData.append('origin_province_id', this.asalProvinsi);
    }
  
    if (this.selectedCityName) {
      formData.append('origin_city_name', this.selectedCityName);
    } else if (this.namaAsalKota) {
      formData.append('origin_city_name', this.namaAsalKota);
    }
  
    if (this.asalKota) {
      formData.append('origin_city_id', this.asalKota);
    }
  
    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile, this.selectedFile.name);
    } else if (this.data.profile_picture) {
      formData.append('profile_picture', this.data.profile_picture);
    }
  
    this.api.updateUserDetail('userdetail', formData)
      .subscribe(
        async (resp) => {
          this.resp = resp;
          if (this.resp.code == 200) {
            await this.router.navigate(['profile']);
            await loading.dismiss();
            window.location.reload();
          } else {
            await loading.dismiss();
            this.error = this.resp.data
            this.presentAlert(this.error)
            this.selectedFile = null
          }
          this.isSubmitting = false;
        },
      );
  }
  

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = file;

     
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result; 
      };
      reader.readAsDataURL(file); 
    }
  }
}

