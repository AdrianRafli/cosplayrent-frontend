import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toko-home-page',
  templateUrl: './toko-home-page.page.html',
  styleUrls: ['./toko-home-page.page.scss'],
})
export class TokoHomePagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
  goToProduct(){
    this.router.navigate(['/toko-produk']).then(() => {
      window.location.reload();
    });;
  }

  goToChat(){
    this.router.navigate(['/home'])
  }
  
  goToOrder(){
    this.router.navigate(['/pesanan'])
  }
  
  goToProfile(){
    this.router.navigate(['/profile'])
  }
}
