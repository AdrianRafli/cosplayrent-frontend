import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
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
  namaAsalKota:any
  namaAsalProvinsi:any
  cities: any;

  // New variables to store selected province and city names
  selectedProvinceName: any 
  selectedCityName: any 

  resp: any;

  constructor(public api: ApiService, public router: Router, private alertController: AlertController, private rajaOngkirService: RajaOngkirService) { }

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
            console.log('Default Province:', this.asalProvinsi);
            console.log('Default City:', this.asalKota);
            console.log("got here")
            console.log(this.namaAsalKota)
            console.log(this.namaAsalProvinsi)
            this.fetchProvinces();
            this.fetchCity();
           
            console.log("got here 2")
          } else {
            this.fetchProvinces();
          }
        }
      });
    } else {
      console.log('Token is empty or does not exist');
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
        console.log('Provinces loaded:', this.provinces);
      } else {
        console.error('Failed to load provinces');
      }
    });
  }

  onAsalProvinsiChange() {
    console.log('Province changed to:', this.asalProvinsi);
  
    // Find the province name from the provinces list
    const selectedProvince = this.provinces.find((province: any) => province.province_id === this.asalProvinsi);
    if (selectedProvince) {
      this.selectedProvinceName = selectedProvince.province;
    }

    this.fetchCity(); // Fetch cities for the selected province
  }

  onCityChange() {
    console.log('City changed to:', this.asalKota);
    
    // Find the city name from the cities list
    const selectedCity = this.cities.find((city: any) => city.city_id === this.asalKota);
    if (selectedCity) {
      this.selectedCityName = selectedCity.city_name;
      console.log(this.selectedCityName)
      console.log(this.selectedProvinceName)
    }
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
        console.log('Cities loaded:', this.cities);
      } else {
        console.error('Failed to load cities');
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

  dosave() {
    if (!this.validateFields()) {
      return;
    }
    
    const formData = new FormData();
    formData.append('name', this.data.name);
    formData.append('email', this.data.email);
    formData.append('address', this.data.address);
    if (this.selectedProvinceName == null && this.namaAsalProvinsi != null){
      formData.append('origin_province_name', this.namaAsalProvinsi)
      formData.append('origin_province_id', this.asalProvinsi)
    } else {
      formData.append('origin_province_name', this.selectedProvinceName)
      formData.append('origin_province_id', this.asalProvinsi)
    }
    if (this.selectedCityName == null && this.namaAsalKota != null){
      formData.append('origin_city_name', this.namaAsalKota)
      formData.append('origin_city_id', this.asalKota)
    } else {
      formData.append('origin_city_name', this.selectedCityName)
      formData.append('origin_city_id', this.asalKota)
    }
    // console.log("Ini selected file:", this.selectedFile);
    // console.log("Ini profile_picture:", this.data.profile_picture);
  
    if (this.selectedFile) {
      console.log("Appending selected profile_picture...");
      formData.append('profile_picture', this.selectedFile, this.selectedFile.name);
      console.log("Selected file:", this.selectedFile);
    } else {
      console.log("No file selected, using existing profile_picture");
      formData.append('profile_picture', this.data.profile_picture);
    }
  
    this.api.updateUserDetail('userdetail', formData).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code = "200") {
        console.log("Successfully updated profile");
        this.router.navigate(['profile']).then(() => {
          window.location.reload();
        });
      } else {
        console.log("Failed to update profile");
      }
    },
    (error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
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

