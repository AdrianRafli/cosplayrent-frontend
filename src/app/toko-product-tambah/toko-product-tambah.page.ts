import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-toko-product-tambah',
  templateUrl: './toko-product-tambah.page.html',
  styleUrls: ['./toko-product-tambah.page.scss'],
})
export class TokoProductTambahPage implements OnInit {
  product: any = {nama: "",harga: '', deskripsi: "", bahan: "", ukuran: '', berat: '', kategori:'', ketersedian: ''};

  selectedFiles: string[] = ["../../assets/illustration/black.jpeg"];
  selectedSize: any
  kategori =  ["Naruto", "One Piece", "paket"];
  id:any
  resp:any
  data:any = {
    available: '',
    bahan: '',
    berat: 0,
    costume_picture: '',
    created_at: '',
    description: '',
    id: null,
    kategori: '',
    name: '',
    price: null,
    profile_picture: null,
    ukuran: '',
    updated_at: null,
    user_id: '',
    username: ''
  }
  userData:any
  selectedFile:any
  previewUrl:any

  selectedCategory:any

  categories: any

  isSubmitting = false;
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    public api:ApiService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.api.getUserDetail('userdetail').subscribe((resp)=> {
      // console.log("login", resp)
      this.resp = resp
      if (this.resp.code == "200"){
        this.userData = this.resp.data
      }
    })

    this.api.getCategory('categories').subscribe((resp)=> {
      this.resp = resp

      if (this.resp.code == "200"){
        this.categories = this.resp.data
        console.log(this.categories)
      }
    })
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
      header: "Add Product Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  validateFields(): boolean {
    const {name, description, bahan, ukuran, berat, kategori, price} = this.data;

    if (this.selectedFile == null) {
      this.presentAlert(
        "Costume image cannot be empty"
      )
      return false;
    }

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

    if (!ukuran || ukuran.length < 0 || ukuran.length > 5) {
      this.presentAlert(
        "Ukuran must be between 1 and 5 characters."
      );
      return false;
    }

    if (!berat || berat.length < 0 || berat.length > 4) {
      this.presentAlert(
        "Berat must be between 1 and 4 characters."
      );
      return false;
    }

    if (!kategori || kategori.length > 1 || kategori.length > 30) {
      this.presentAlert(
        "Kategori must more than 1 character."
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

  async dosave() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    console.log("this data ukuran",this.data.ukuran)

    if (!this.validateFields()) {
      this.isSubmitting = false;
      return;
    }

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();

    const formData = new FormData();
    formData.append('user_id', this.userData.id)
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

    console.log(this.data.ukuran)
  
    this.api.createCostume('costume', formData)
    .subscribe(
      async (resp) => {
      this.resp = resp;
      if (this.resp.code == "200") {
        console.log("Successfully updated costume");
        await this.router.navigate(['toko-produk'])
        await loading.dismiss();
        window.location.reload(); 
      } else {
        await loading.dismiss();
        this.presentAlert(this.resp.data)
      }
      this.isSubmitting = false;
    }
  );
    
  }

  goToTokoProduk(){
    this.router.navigate(['/toko-produk'])
  }
}
