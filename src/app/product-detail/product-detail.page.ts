import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  id:any
  resp:any
  costume: any = []
  constructor(private route: ActivatedRoute, public api:ApiService ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.api.getCostumesById('costume/', this.id).subscribe((resp)=> {
      this.resp = resp

      if(this.resp.code == 200) {
        this.costume = this.resp.data
        console.log(this.costume)
    }
  })
  }
}
