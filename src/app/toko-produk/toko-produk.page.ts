import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-toko-produk',
  templateUrl: './toko-produk.page.html',
  styleUrls: ['./toko-produk.page.scss'],
})
export class TokoProdukPage implements OnInit {
  resp:any
  data:any= {
    id:'',
    name:'',
    address:'',
    email:'',
    profile_picture:'',
    created_at:'',
  }
  costume:any = {
      available: '',
      bahan: '',
      berat: '',
      costume_picture: '',
      created_at: '',
      description: '',
      id: null,
      kategori: '',
      name: '',
      price: null,
      profile_picture: null,
      ukuran: '',
      updated_at: null,
      user_id: '',
      username: ''
  }
  
  constructor(private router: Router, public api: ApiService,  private activatedRoute: ActivatedRoute,  private alertController: AlertController,) { }

  ngOnInit() {
    this.api.getSellerCostume('seller').subscribe((resp) => {
      this.resp = resp
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.costume = this.resp.data
      }
    })
  }

  goToTokoHome(){
    this.router.navigate(['/toko-home-page'])
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  goToTambahProduk(){
    this.api.getSellerStatus('checksellerstatus').subscribe((resp) => {
      this.resp = resp  
      if (this.resp.code == "200"){
        console.log(this.resp)
        this.router.navigate(['/toko-product-tambah'])
      }
      else {
        this.presentAlert(this.resp.data)
      }
  },)
  }

  deleteProduct(id:number){
    this.api.deleteCostume('seller/',id).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == "200") {
        this.router.navigate(['toko-produk']).then(() => {
          window.location.reload();
        });
       console.log(this.resp)
      }
    })
  }

  editProduct(id:number){
    this.router.navigate(['toko-product-edit', id])
  }
  
  goToHome(){
    this.router.navigate(['/toko-home-page']);
  }
  goToProduct(){
    this.router.navigate(['/toko-home-page']);
  }

  goToChat(){
    this.router.navigate(['/toko-home-page'])
  }
  
  goToOrder(){
    this.router.navigate(['/pesanan'])
  }
  
  goToProfile(){
    this.router.navigate(['/profile'])
  }
}
