import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.page.html',
  styleUrls: ['./profile-change.page.scss'],
})
export class ProfileChangePage implements OnInit {
  data: any = { id: '', name: '', email: '', address: '', profile_picture: '', created_at: '' };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  Token:any
  staticusername:any

  resp: any;

  constructor(public api: ApiService, public router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.Token = localStorage.getItem('userToken')
    if (this.Token !== null && this.Token.trim() !== '') {
      this.api.getUserDetail('userdetail').subscribe((resp) => {
        this.resp = resp;
        if (this.resp.code == "200") {
          this.data = this.resp.data;
          this.staticusername = this.resp.data.name
          console.log(this.data);
        }
      })
    } else {
      console.log('Token is empty or does not exist');
      this.router.navigate(['/login'])
    }
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
    const {name, email, address, password, profile_picture } = this.data;

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

    if (!address || address.length < 5 || address.length > 100) {
      this.presentAlert(
        "Address must be between 5 and 100 characters."
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
    formData.append('email', this.data.email);
    formData.append('address', this.data.address);
  
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
  
    this.api.updateUserProfile('user/', this.data.id, formData).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code = "200") {
        console.log("Successfully updated profile");
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

