import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  product = {
    name: 'Costum Naruto',
    price: 10000000,
    totalRent: 200,
    rating: 4.9,
    image: '/assets/product/kostum-2.png',
    material: 'Kain',
    size: 'S/M/L',
    weight: 1,
    category: 'Anime',
    description: 'Kostum naruto kecil',
    // reviews: [
    //   {
    //     userName: 'Will',
    //     userAvatar: '/assets/product/kostum-5.png',
    //     date: '2 bulan lalu',
    //     comment: 'Kostumnya bagus dan bersih, nyaman dipake dan penyewanya ramah, bintang 5 deh pokoknya.'
    //   }
    // ],
    shop: {
      name: 'Raja Cosplay',
      avatar: '/assets/product/kostum-6.png',
      lastOnline: 'Online 20 menit lalu'
    }
  };

  // costumes = [
  //   {
  //     name: 'Costum Naruto',
  //     price: 100000,
  //     rating: 4.8,
  //     totalRent: 169,
  //     shopName: 'RajaCosplay',
  //     city: 'Jakarta Selatan',
  //     image: '/assets/product/kostum-1.png'
  //   },
  //   {
  //     name: 'Sixth Path Naruto',
  //     price: 150000,
  //     rating: 4.9,
  //     totalRent: 200,
  //     shopName: 'CosplayId',
  //     city: 'Jakarta Barat',
  //     image: '/assets/product/kostum-2.png'
  //   },
  //   {
  //     name: 'Kostum Naruto',
  //     price: 200000,
  //     rating: 4.9,
  //     totalRent: 124,
  //     shopName: 'CosplayId',
  //     city: 'Jakarta Barat',
  //     image: '/assets/product/kostum-3.png'
  //   },
  //   {
  //     name: 'Kostum Naruto',
  //     price: 70000,
  //     rating: 4.9,
  //     totalRent: 69,
  //     shopName: 'CosplayId',
  //     city: 'Jakarta Barat',
  //     image: '/assets/product/kostum-4.png'
  //   },
  //   {
  //     name: 'Kostum Naruto',
  //     price: 300000,
  //     rating: 4.9,
  //     totalRent: 70,
  //     shopName: 'CosplayId',
  //     city: 'Jakarta Barat',
  //     image: '/assets/product/kostum-5.png'
  //   },
  //   {
  //     name: 'Kostum Naruto',
  //     price: 100000,
  //     rating: 4.9,
  //     totalRent: 24,
  //     shopName: 'CosplayId',
  //     city: 'Jakarta Barat',
  //     image: '/assets/product/kostum-6.png'
  //   },
  // ];

  id:any
  resp:any
  costume: any = []
  Allcostume: any[] = []
  review: any = []
  ids = this.costume.id

  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    this.api.getCostumesById('costume/', this.id).subscribe((resp)=> {
      this.resp = resp

      if(this.resp.code == 200) {
        this.costume = this.resp.data
        console.log(this.costume)
      }

      this.api.getReviewByCostumeId('review/',this.costume.id).subscribe((resp)=>{
        console.log(this.costume.id)
        this.resp = resp
        if(this.resp.code == "200") {
          this.review = this.resp.data
          console.log(this.review)
        }
      })
    })

    this.api.getCostumes('costume').subscribe((resp)=>{
      this.resp = resp
       if(this.resp.code == "200") {
         this.Allcostume = this.resp.data
         console.log(this.Allcostume)
       }
     })
  }

  goToCheckout(){
    this.router.navigate(['/checkout']);
  }

  goToCostumeDetail(costumeId:number){
    this.router.navigate(['/detail-product', costumeId]);
  }
}
