import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-see-comment',
  templateUrl: './see-comment.page.html',
  styleUrls: ['./see-comment.page.scss'],
})
export class SeeCommentPage implements OnInit {
  comments = [
    {
      user: 'Will',
      rating: 5,
      time: '2 bulan lalu',
      text: 'Kostumnya bagus dan bersih, nyaman dipake dan penyewanya ramah, bintang 5 deh pokoknya.',
      avatar: '../../assets/illustration/black.jpeg', // Path to the avatar image
      images: [
        '../../assets/illustration/black.jpeg',
        '../../assets/illustration/black.jpeg'
      ] // Array of images for this comment
    },
    {
      user: 'John',
      rating: 4,
      time: '1 bulan lalu',
      text: 'Kostumnya sangat nyaman dan sesuai harapan.',
      avatar: '../../assets/illustration/black.jpeg', // Path to the avatar image
      images: [] // No images for this comment
    },
    
    // Add more comments as needed
  ];

  id:any
  resp:any
  review:any=[]
  
  constructor(private router: Router,public api:ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['costumeid']

    this.api.getReviewByCostumeId('costume/',this.id).subscribe((resp)=>{
      this.resp = resp
      if(this.resp.code == "200") {
        this.review = this.resp.data
        console.log(this.review)
      }
    })
  }
}

