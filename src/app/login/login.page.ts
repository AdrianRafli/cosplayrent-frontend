import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  data: any = { email: "", password: "" };
  resp: any;
  successMessage: string = "";
  constructor(
    public api: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["successMessage"]) {
        this.successMessage = params["successMessage"];
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  
  validateFields(): boolean {
    const { email, password } = this.data;

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

  doLogin() {
    if (!this.validateFields()) {
      return;
    }

    this.api.post("login", this.data).subscribe(
      (resp) => {
        // console.log("login", resp)
        this.resp = resp;

        if (this.resp.code == 200) {
          localStorage.setItem("userToken", this.resp.data.token);
          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
          
        } else {
          this.presentAlert("Invalid email or password.");
        }
      },
      (error) => {
        const errormessage = error.error?.data || "An error occurred. Please try again."
        this.presentAlert(errormessage);
      },
    );
  }

  doLogout() {
    localStorage.removeItem("userToken")
    window.location.reload();
  }
}
