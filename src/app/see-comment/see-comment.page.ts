import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    // No additional logic needed
  }
}

