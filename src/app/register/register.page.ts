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

  doRegister() {
    // console.log(this.data);
    if (!this.data.name || !this.data.email || !this.data.password) {
      this.presentAlert("All fields are required.");
      return;
    }

    this.api.post("register", this.data).subscribe(
      (resp) => {
        // console.log('register', resp);
        this.resp = resp;

        if (this.resp.code == 200) {
          this.router.navigate(["/home"], {
            queryParams: {
              successMessage: "Registration successful! Please log in.",
            },
          });
        } else {
          this.presentAlert("Registration failed. Please try again.");
      }
      },
      (error) => {
        this.presentAlert("An error occurred. Please try again.");
      },
    );
  }
}
