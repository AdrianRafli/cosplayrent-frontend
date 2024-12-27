import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-histori',
  templateUrl: './order-histori.page.html',
  styleUrls: ['./order-histori.page.scss'],
})
export class OrderHistoriPage implements OnInit {
  selectedStatus: string = 'semua'; // Properti untuk status yang dipilih
  selectedDateOption: string = 'semua'; // Properti untuk opsi tanggal yang dipilih
  startDate: string | null = null; // Properti untuk tanggal mulai
  endDate: string | null = null; // Properti untuk tanggal akhir

  orders: any[] = [
    {
      id: "1",
      status_order: "Belum Dikembalikan",
      costume_id: 1,
      costume_name: "Kostum Naruto",
      costume_price: 10000000,
      costume_size: "XXL",
      costume_picture: ["../../assets/illustration/black.jpeg"], // Mengubah menjadi array
      total: 10000000,
      updated_at: "2024-10-09",
      user_id: "1",
      username: "Raja Cosplay",
      profile_picture: "../../assets/illustration/defaultprofile.jpg", // Gambar profil
      rental_start: "2024-10-09",
      rental_end: "2024-10-16",
    },
    {
      id: "2",
      status_order: "Selesai",
      costume_id: 2,
      costume_name: "Kostum Sasuke",
      costume_price: 10000000,
      costume_size: "XXL",
      costume_picture: ["../../assets/illustration/black.jpeg","../../assets/illustration/black.jpeg"], // Mengubah menjadi array
      total: 10000000,
      updated_at: "2024-10-09",
      user_id: "1",
      username: "Raja Cosplay",
      profile_picture: "../../assets/illustration/defaultprofile.jpg", // Gambar profil
      rental_start: "2024-10-09",
      rental_end: "2024-10-17",
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  nilai(orderId: string) {
    console.log(`Nilai order ID: ${orderId}`);
  }

  sewaLagi(orderId: string) {
    console.log(`Sewa lagi untuk order ID: ${orderId}`);
  }

  // Metode untuk menghitung durasi sewa dalam hari
  calculateRentalDuration(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung selisih dalam hari
  }

  // Metode untuk menangani perubahan opsi tanggal
  onDateOptionChange() {
    // Logika tambahan jika diperlukan
  }
}
