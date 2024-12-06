import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  data: any = {
    name: "",
    email: "",
    password: "",
  };
  resp: any;

  constructor(
    public api: ApiService,
    public router: Router,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Registration Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  validateFields(): boolean {
    const { name, email, password } = this.data;

    // Validasi Username
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

    // Validasi Password
    if (!password || password.length < 5 || password.length > 20) {
      this.presentAlert(
        "Password must be between 5 and 20 characters."
      );
      return false;
    }

    return true;
  }

  doRegister() {
    if (!this.validateFields()) {
      return;
    }

    this.api.post("register", this.data).subscribe(
      (resp) => {
        // console.log('register', resp);
        this.resp = resp;

        // Cek jika username atau email duplikat
        // if (this.resp.code === 409) {
        //   this.presentAlert("Username or email already exists.");
        //   return;
        // }

        if (this.resp.code == 200) {
          localStorage.setItem("userToken", this.resp.data.token);
          this.router.navigate(["/home"]).then(() => {
            window.location.reload();
          });
        } else {
          this.presentAlert("Registration failed. Please try again.");
      }
      },
      (error) => {
        const errormessage = error.error?.data || "An error occurred. Please try again."
        this.presentAlert(errormessage);
      },
    );
  }
}
