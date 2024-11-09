import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toko-product-tambah',
  templateUrl: './toko-product-tambah.page.html',
  styleUrls: ['./toko-product-tambah.page.scss'],
})
export class TokoProductTambahPage implements OnInit {
  kategori: any[] = ["Naruto", "One Piece", "paket"];
  Ukuran: any[] = ["S", "M", "L", "XL"];
  pictures: File[] = [];  // Array untuk menyimpan file gambar yang diunggah
  selectedFiles: string[] = []; // Ubah menjadi array string untuk menyimpan URL gambar
  product: any ={nama:"",harga:"",deskripsi:"",bahan:"",ukuran:[],berat:"",kategori:"",ketersedian:""}


  constructor() { }

  ngOnInit() {
  }
  dosave() {
    const beratDenganUnit = `${this.product.berat} Gram`;
    const productData = {
      images: this.selectedFiles, // Menyimpan URL gambar yang terpilih
      nama: this.product.nama,
      harga: this.product.harga,
      deskripsi: this.product.deskripsi,
      bahan: this.product.bahan,
      ukuran: this.product.ukuran,
      berat: beratDenganUnit,
      kategori: this.product.kategori,
      ketersedian: this.product.ketersedian
    }; 
    console.log(productData);
}


  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push(e.target.result); // Simpan URL gambar ke dalam array
        };
        reader.readAsDataURL(file); // Membaca file sebagai URL
      }
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1); // Menghapus file dari array
  }
}
