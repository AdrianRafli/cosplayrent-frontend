import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
  }

  goToEMoney(){
    this.router.navigate(['/emoney']);
  }

}
