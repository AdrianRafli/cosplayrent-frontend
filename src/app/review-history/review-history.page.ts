import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.page.html',
  styleUrls: ['./review-history.page.scss'],
})
export class ReviewHistoryPage implements OnInit {

  selectTabs = 'menunggu';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }
}
