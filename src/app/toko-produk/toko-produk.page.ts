import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toko-produk',
  templateUrl: './toko-produk.page.html',
  styleUrls: ['./toko-produk.page.scss'],
})
export class TokoProdukPage implements OnInit {

  products = [
    {
      name: 'Costume Naruto',
      price: '10.000.000',
      sizes: ['S', 'M', 'L', 'XL'],
      image: '../../assets/product/kostum-1.png',
    },
    {
      name: 'Costume Naruto',
      price: '10.000.000',
      sizes: ['S', 'M', 'L', 'XL'],
      image: '../../assets/product/kostum-2.png',
    },
    // Tambahkan produk lainnya
  ];

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
  
  constructor(private router: Router, public api: ApiService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.api.get('verifytoken').subscribe((resp)=> {
      // console.log("login", resp)
      this.resp = resp

      if(this.resp.code == "200") {
        this.data = this.resp.data
        console.log(this.data)
        this.api.getUserCostume('find/user/costume/',this.data.id).subscribe((resp)=> {
          this.resp = resp
    
          if(this.resp.code == "200") {
            this.costume = this.resp.data
            console.log(this.costume)
          }
          else {
            this.router.navigate(['/home'])
          }
        })
      }
    })
  }

  goToTambahProduk(){
    this.router.navigate(['/toko-product-tambah'])
  }

  deleteProduct(id:number){
    this.api.deleteCostume('costume/',id).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.code == "200") {
       console.log(this.resp)
      }
    })
  }

  editProduct(id:number){
    this.router.navigate(['toko-product-edit', id])
  }
  
  goToHome(){
    this.router.navigate(['home'])
  }
}
