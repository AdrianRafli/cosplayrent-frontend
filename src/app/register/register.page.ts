import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

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

  isSubmitting = false;

  constructor(
    public api: ApiService,
    public router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
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

  async doRegister() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    if (!this.validateFields()) {
      this.isSubmitting = false;
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();

    this.api.post("register", this.data).subscribe(
      async (resp) => {
        // console.log('register', resp);
        this.resp = resp;

        // Cek jika username atau email duplikat
        // if (this.resp.code === 409) {
        //   this.presentAlert("Username or email already exists.");
        //   return;
        // }

        if (this.resp.code == 200) {
          localStorage.setItem("userToken", this.resp.data.token);
          await this.router.navigate(["/home"])
          await loading.dismiss();
          window.location.reload();
        } else {
          await loading.dismiss();
          this.presentAlert(this.resp.data)
          //this.presentAlert("Registration failed. Please try again.");
        }
      this.isSubmitting = false;
    },
    async (error) => {
        await loading.dismiss();
        const errormessage = error.error?.data || "An error occurred. Please try again."
        this.presentAlert(errormessage);
        this.isSubmitting = false;
      },
    );
  }
}
