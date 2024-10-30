import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://cosplayrent.site/api/'
  token:any = ''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken') || ''
  }

  post(url:any, data:any) {

    return this.http.post(this.baseUrl+url,data,
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  get(url:any) {
    return this.http.get(this.baseUrl+url,
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  getCostumes(url:any) {
    return this.http.get(this.baseUrl+url,
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  getCostumesById(url:any,id:string) {
    return this.http.get(this.baseUrl+url+id,
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  getCostumesByName(url:any,search:string) {
    return this.http.get(this.baseUrl+url+search,
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  getReviewByCostumeId(url:any,costumeId:any) {
    return this.http.get(this.baseUrl+url+costumeId,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
}
