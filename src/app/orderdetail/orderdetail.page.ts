import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import { Location } from '@angular/common';

interface NavigationState {
  data: string;   
}

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.page.html',
  styleUrls: ['./orderdetail.page.scss'],
})
export class OrderdetailPage implements OnInit {

  constructor( private location: Location,private router: Router, private route: ActivatedRoute, public api:ApiService, private alertController: AlertController) { }

  id:any
  resp:any
  order: any = {
    costume_picture: "",
    costume_name:"",
    costume_price:0,
    costume_size:"",
    costumer_name: "",
    costumer_address: "",
    costumer_origin_province: "",
    costumer_origin_city: "",
    costumer_identity_card: "",
    seller_response:"",
  };

  orderResponseClient:any = {
    status_order:'',
    description:'',
  }

  description:any
  status:any
  

  ngOnInit() {
    console.log('Location state:', this.location.getState());

    const navigation = this.location.getState() as NavigationState;
    this.status = navigation.data
    this.id = this.route.snapshot.params['id']
    this.api.getUserOrderDetail('userorder/',this.id).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.order = this.resp.data
      }
    })
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  doAccept(){
    this.orderResponseClient.status_order = "Finish"
    this.orderResponseClient.description = this.description
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.router.navigate(['/order'])
          .then(() => {
            window.location.reload();
          });
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

  doReject(){
    this.orderResponseClient.status_order = "Cancel"
    this.api.sendOrderDetailClientResponse('order/',this.id,this.orderResponseClient).subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.router.navigate(['/order'])
          .then(() => {
            window.location.reload();
          });
      }
    },(error) => {
      const errormessage = error.error?.data || "An error occurred. Please try again."
      this.presentAlert(errormessage);
    },)
  }

}
