import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubah-sandi',
  templateUrl: './ubah-sandi.page.html',
  styleUrls: ['./ubah-sandi.page.scss'],
})
export class UbahSandiPage implements OnInit {
  pass: any = { new: "", konfirmasi: "" };
  passwordsMatch: boolean = true; // To track if passwords match
  errorMessage: string = ""; // Untuk menampilkan pesan kesalahan

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() { }

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement; 
    const iconElement = inputElement?.closest('ion-input')?.querySelector('ion-icon') as HTMLElement;

    if (!inputElement || !iconElement) {
      return;
    }

    // Toggle visibility
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
      iconElement.setAttribute('name', 'eye-off'); // Ganti ikon ketika kata sandi terlihat
    } else {
      inputElement.type = 'password';
      iconElement.setAttribute('name', 'eye'); // Ganti ikon kembali ke eye
    }
  }

  gantipassword() {
    // Hanya memeriksa kesesuaian kata sandi ketika tombol ditekan
    if (this.pass.new === this.pass.konfirmasi) {
      this.passwordsMatch = true;
      this.errorMessage = ""; // Kosongkan pesan kesalahan
      console.log(this.pass);
      console.log("Kata sandi berhasil diubah");
      // Implementasi logika untuk mengganti kata sandi dapat ditambahkan di sini
    } else {
      this.passwordsMatch = false;
      this.errorMessage = "Kata sandi dan konfirmasi tidak cocok."; // Set pesan kesalahan
    }
  }
}
