import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  resp:any
  userData:any
  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService) { }

  ngOnInit() {
    this.api.get('verifytoken').subscribe((resp)=> {
      console.log(resp)
      this.resp = resp
      if(this.resp.code == "200") {
        this.userData = this.resp
      }})
  }

}
