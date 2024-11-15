import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

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
  data:any
  selectedFile:any
  previewUrl:any
  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    if (this.id != null) {
      this.api.getCostumesById('costume/',this.id).subscribe((resp) => {
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

  dosave() {
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
  
    this.api.updateCostumeById('costume/', this.data.id, formData).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code = "200") {
        console.log("Successfully updated costume");
      } else {
        console.log("Failed to update costume");
      }
    });
  }
}
