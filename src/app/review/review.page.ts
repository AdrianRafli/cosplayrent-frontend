import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController, LoadingController } from '@ionic/angular';


interface NavigationState {
  data: string;  // Adjust the type according to the data you are sending
  data1: number;    // Adjust the type accordingly
  data2:string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  // sesuain sama database
  data: any = { id: '',  review_rating: '', review_picture: '', review_comment: ''};
  receivedData : any
  receivedData1: any
  receivedData2:any
  // Token:any

  // resp: any;

  rating = 0;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  isSubmitting = false;
  costume:any=[]
  review:any
  request: any = {
    order_id:'',
    costume_id:0,
    description:'',
    review_picture:'',
    rating:'',
  };
  resp:any

  constructor(public api: ApiService, public router: Router,private location: Location, private loadingCtrl: LoadingController, private alertController: AlertController, 
  ) { }

  ngOnInit() {
    const navigation = this.location.getState() as NavigationState;

    if (navigation && navigation.data && navigation.data1) {
      this.receivedData = navigation.data;
      this.receivedData1 = navigation.data1;
      this.receivedData2 = navigation.data2;
      console.log('Received Data:', this.receivedData);
      console.log('Received Data1:', this.receivedData1);
      console.log('Received Data2:', this.receivedData2);

      if (this.receivedData2 == "riwayat"){
        this.api.getCostumesById('costume/',this.receivedData1).subscribe((resp)=>{
          this.resp = resp
    
          if (this.resp.code == "200"){
            this.costume = this.resp.data
          }
        })

        this.api.getReviewInfo("reviewinfo/",this.receivedData).subscribe((resp)=>{
          this.resp = resp

          if (this.resp.code == "200"){
            this.request = this.resp.data
            this.setRating(this.resp.data.review_rating)
            console.log(this.resp.data)
          }
        })
      }
      else{
        this.api.getCostumesById('costume/',this.receivedData1).subscribe((resp)=>{
          this.resp = resp
    
          if (this.resp.code == "200"){
            this.costume = this.resp.data
          }
        })
      }
    } else {
      console.log('Failed to get navigation data');
    }
  }

  // nilai rating disimpan di variable rating (number 1-5)
  setRating(value: number) {
    this.rating = value;
    console.log(this.rating);
  }

  goToOrder(){
    this.router.navigate(['/review-history']).then(() => {
      window.location.reload();
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Review Process Failed",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  saveReview() {
    if(this.receivedData2 == "riwayat"){
      const formData = new FormData();
      
      formData.append('rating', String(this.rating));
      formData.append('description', this.review);
      if (this.selectedFile) {
        formData.append('review_picture', this.selectedFile, this.selectedFile.name);
      }

      this.api.updateReview('review/',this.request.review_id,formData).subscribe((resp) => {
        this.resp = resp;
        if (this.resp.code == "200") {
          console.log(this.resp);
          this.router.navigate(['/review-history']).then(() => {
            window.location.reload();
          });
        } else { 
          this.presentAlert(this.resp.data);
        }
      });
    } else {
      if (this.rating != null && this.selectedFile != null && this.review != null) {
        const formData = new FormData();
        
          // Convert numbers to strings and append fields
        formData.append('rating', String(this.rating));
        formData.append('order_id', String(this.receivedData));
        formData.append('costume_id', this.receivedData1);
        formData.append('description', this.review);
    
        // Append file with name if selected
        if (this.selectedFile) {
          formData.append('review_picture', this.selectedFile, this.selectedFile.name);
        }
    
        // API call
        this.api.sendReview('review', formData).subscribe((resp) => {
          this.resp = resp;
          if (this.resp.code == "200") {
            console.log(this.resp);
            this.router.navigate(['/review-history']).then(() => {
              window.location.reload();
            });
          } else { 
            this.presentAlert(this.resp.data);
          }
        });
      } else {
        this.presentAlert("Please input rating, review picture, and description");
      }
    } 
  }
  
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = file;

     
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result; 
      };
      reader.readAsDataURL(file); 
    }
  }

  deleteReview(reviewid:number){
    this.api.deleteReview('review/',reviewid).subscribe((resp)=>{
      this.resp = resp

      if (this.resp.code == "200"){
        this.router.navigate(['/review-history']).then(() => {
          window.location.reload();
        });
      }
    })
  }

}
