import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  // Fungsi untuk menghapus akun
  deleteAccount() {
    console.log('Akun dihapus');
    // Logika tambahan untuk menghapus akun
  }

  // Fungsi untuk keluar akun
  logoutAccount() {
    console.log('Keluar dari akun');
    // Logika tambahan untuk keluar dari akun
  }

  public deleteAlertButtons = [
    {
      text: 'Batal',
      role: 'cancel',
      handler: () => {
        console.log('delete canceled');
      },
    },
    {
      text: 'Hapus',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => this.deleteAccount()
    }
  ]

  public logoutAlertButtons = [
    {
      text: 'Batal',
      role: 'cancel',
      handler: () => {
        console.log('logout canceled');
      },
    },
    {
      text: 'Logout',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => this.logoutAccount()
    }
  ]

}
