import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-toko-product-edit',
  templateUrl: './toko-product-edit.page.html',
  styleUrls: ['./toko-product-edit.page.scss'],
})
export class TokoProductEditPage implements OnInit {
  product: any = {nama: "",harga: '', deskripsi: "", bahan: "", ukuran: '', berat: '', kategori:'', ketersedian: ''};

  selectedFiles: string[] = ["../../assets/illustration/black.jpeg"]; 
  kategori =  ["Naruto", "One Piece", "paket"];
  Ukuran = ['S', 'M', 'L', 'XL'];
  id:any
  resp:any
  data: any = {
    id: 0,
    user_id: '',
    username: '',
    profile_picture: '', // Assuming it can be null
    name: '',
    description: '',
    bahan: '',
    ukuran: '',
    berat: 0,
    kategori: '',
    price: 0,
    costume_picture: '',
    available: '', // Assuming it's a string as per the response
    created_at: '',
    updated_at: ''
  };
  
  selectedFile:any
  previewUrl:any
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    public api:ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    if (this.id != null) {
      this.api.getCostumesById('seller/',this.id).subscribe((resp) => {
        this.resp = resp;
        if (this.resp.code == "200") {
         console.log(this.resp)
         this.data = this.resp.data
        }
      })
    }
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Update Product Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  validateFields(): boolean {
    const {name, description, bahan, ukuran, berat, kategori, price} = this.data;

    if (!name || name.length < 5 || name.length > 50) {
      this.presentAlert(
        "Username must be between 5 and 20 characters."
      );
      return false;
    }

    if (!description || description.length < 5 || description.length > 1000) {
      this.presentAlert(
        "Description must be between 5 and 100 characters."
      );
      return false;
    }

    if (!bahan || bahan.length < 5 || bahan.length > 30) {
      this.presentAlert(
        "Bahan must be between 5 and 20 characters."
      );
      return false;
    }

    if (!ukuran || ukuran.length < 5 || ukuran.length > 30) {
      this.presentAlert(
        "Ukuran must be between 5 and 255 characters."
      );
      return false;
    }

    if (!berat || berat.length < 1 || berat.length > 30) {
      this.presentAlert(
        "Berat must be between 1 and 30 characters."
      );
      return false;
    }

    if (!kategori || kategori.length < 5 || kategori.length > 30) {
      this.presentAlert(
        "Kategori must be between 5 and 255 characters."
      );
      return false;
    }
    
    if (!price || !Number.isInteger(Number(price))) {
      this.presentAlert(
        "Input must be an integer."
      );
      return false;
    }

    return true;
  }

  dosave() {
    if (!this.validateFields()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.data.name);
    formData.append('description', this.data.description);
    formData.append('bahan', this.data.bahan);
    formData.append('ukuran', this.data.ukuran)
    formData.append('berat', this.data.berat)
    formData.append('kategori', this.data.kategori)
    formData.append('price', this.data.price)

    if (this.selectedFile) {
      console.log("Appending selected costume_picture...");
      formData.append('costume_picture', this.selectedFile, this.selectedFile.name);
      console.log("Selected file:", this.selectedFile);
    } else {
      console.log("No file selected, using existing costume_picture");
      formData.append('costume_picture', this.data.costume_picture);
    }
    
    formData.append('available', this.data.available)

    console.log(formData)
  
    this.api.updateCostumeById('seller/', this.data.id, formData).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code = "200") {
        console.log("Successfully updated costume");
        this.router.navigate(['toko-produk']).then(() => {
        window.location.reload();
        });
      } else {
        console.log("Failed to update costume");
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },
  );
  }
}
