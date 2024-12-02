import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RajaOngkirService {
  //private baseUrl = 'http://localhost:8081/api/'; // Update with your Go server URL
  //private baseUrl = 'http://localhost:8080/api/provinces'; // Update with your Go server URL
  private baseUrl = 'https://cosplayrent.site/api/'
  constructor(private   http: HttpClient) {}

  getProvinces(url:any){
    return this.http.get(this.baseUrl+url)
  }

  getCity(url:any,province_id:any){
    return this.http.get(this.baseUrl+url+province_id)
  }
  
  postOrder(url:any,data:any){
    return this.http.post(this.baseUrl+url,data)
  }
}
