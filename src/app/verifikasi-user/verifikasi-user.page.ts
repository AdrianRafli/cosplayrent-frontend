import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from "@ionic/angular";


@Component({
  selector: 'app-verifikasi-user',
  templateUrl: './verifikasi-user.page.html',
  styleUrls: ['./verifikasi-user.page.scss'],
})
export class VerifikasiUserPage implements OnInit {
  data: any = { profile_picture: ''};
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  Token:any

  resp: any;

  identityCardPicture:any

  isSubmitting = false;

  constructor(
    public api: ApiService, 
    public router: Router, 
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  ngOnInit() {
    this.api.getIdentityCard('identitycard').subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == "200") {
        this.identityCardPicture = this.resp.data.identitycard_picture
      } else {
        console.log("Failed to get identity card picture");
      }
    });
  }

  async dosave() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    // if (!this.validateFields()) {
    //   return;
    // }

    // Tampilkan loading sebelum proses
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    await loading.present();
  
    console.log("Ini selected file:", this.selectedFile);
    console.log("Ini profile_picture:", this.data.profile_picture);
  
    const formData = new FormData();
    if (this.selectedFile) {
      console.log("Appending selected profile_picture...");
      formData.append('identity_card', this.selectedFile, this.selectedFile.name);
      console.log("Selected file:", this.selectedFile);
    } else {
      console.log("No file selected, using existing profile_picture");
      formData.append('identity_card', this.data.profile_picture);
    }
  
    this.api.updateIdentityCard('identitycard', formData).subscribe(
      async (resp) => {
      this.resp = resp;
      console.log(this.resp)
      if (this.resp.code == 200) {
        console.log("Successfully updated profile");
        await this.router.navigate(['profile']);
        await loading.dismiss();
        window.location.reload();
        this.isSubmitting = false
      } else {
        await loading.dismiss();
        await this.presentAlert(this.resp.data)
        this.selectedFile = null
        this.isSubmitting = false
      }
      })
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
