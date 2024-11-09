import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toko-product-edit',
  templateUrl: './toko-product-edit.page.html',
  styleUrls: ['./toko-product-edit.page.scss'],
})
export class TokoProductEditPage implements OnInit {
  product: any = {nama: "Test",harga: 100000, deskripsi: "Deskripsi", bahan: "koton", ukuran: ["S","M"], berat: "500", kategori: "Naruto", ketersedian: "yes"};

  selectedFiles: string[] = ["../../assets/illustration/black.jpeg"]; 
  kategori =  ["Naruto", "One Piece", "paket"];
  Ukuran = ['S', 'M', 'L', 'XL'];

  constructor() {}

  ngOnInit() {
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

  dosave() {
    const beratDenganUnit = `${this.product.berat} Gram`;
    const productData = {
      images: this.selectedFiles,
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
}
