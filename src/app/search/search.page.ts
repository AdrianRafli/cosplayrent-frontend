import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: string = '';
  sortOption: string = 'terlaris';
  costumes = [
    {
      name: 'Costum Naruto',
      price: 100000,
      rating: 4.8,
      totalRent: 169,
      shopName: 'RajaCosplay',
      city: 'Jakarta Selatan',
      image: '/assets/product/kostum-1.png'
    },
    {
      name: 'Sixth Path Naruto',
      price: 150000,
      rating: 4.9,
      totalRent: 200,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-2.png'
    },
    {
      name: 'Kostum Naruto',
      price: 200000,
      rating: 4.9,
      totalRent: 124,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-3.png'
    },
    {
      name: 'Kostum Naruto',
      price: 70000,
      rating: 4.9,
      totalRent: 69,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-4.png'
    },
    {
      name: 'Kostum Naruto',
      price: 300000,
      rating: 4.9,
      totalRent: 70,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-5.png'
    },
    {
      name: 'Kostum Naruto',
      price: 100000,
      rating: 4.9,
      totalRent: 24,
      shopName: 'CosplayId',
      city: 'Jakarta Barat',
      image: '/assets/product/kostum-6.png'
    },
  ];

  filteredCostumes = [...this.costumes];
  search : any
  costume: any[] = []
  filteredCostume : any[] = []
  resp: any

  constructor(private router: Router, private route: ActivatedRoute, public api:ApiService) { }

  ngOnInit() {
    // this.filteredCostumes = this.sortCostumes(this.sortOption);
    this.search = this.route.snapshot.params['search']

    this.api.getCostumesByName('search/',this.search).subscribe((resp)=> {
      this.resp = resp

      if(this.resp.code == 200) {
        this.costume = this.resp.data
        console.log(this.costume)
    } 
  })
  }

  goToCostumeDetail(costumeId:number){
    this.router.navigate(['/product-detail', costumeId]);
  }
  

  // onSearch() {
  //   this.filteredCostumes = this.costumes.filter(costume => 
  //     costume.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }

  onSortChange(sortOption: string) {
    this.filteredCostume = this.sortCostumes(sortOption);
  }

  sortCostumes(option: string) {
    if (option === 'harga-terendah') {
      return this.costume.sort((a, b) => a.price - b.price);
    } else if (option === 'harga-tertinggi') {
      return this.costume.sort((a, b) => b.price - a.price);
    }
    return this.costume;
  }

  goBack() {
    // Navigate back logic
  }

  openFilter() {
    // Open filter modal logic
  }

}
