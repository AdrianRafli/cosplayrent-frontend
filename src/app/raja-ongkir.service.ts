import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RajaOngkirService {
  //private baseUrl = 'http://localhost:8081/api/'
  private baseUrl = 'https://cosplayrent.site/api/'
  token:any = ''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken') || ''
  }

  getProvinces(url:any){
    return this.http.get(this.baseUrl+url,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  getCity(url:any,province_id:any){
    return this.http.get(this.baseUrl+url+province_id,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  postOrder(url:any,data:any){
    return this.http.post(this.baseUrl+url,data,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
}
