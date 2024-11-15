import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://cosplayrent.site/api/'
  //baseUrl = 'http://localhost:8081/api/'

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

  verifyAndRetrieve(url:any){
    return this.http.get(this.baseUrl+url,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }

  updateUserProfile(url:any,id:any,data:any){
    return this.http.put(this.baseUrl+url+id,data,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
  getUserCostume(url:any,id:any){
    return this.http.get(this.baseUrl+url+id,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
  getSellerCostumeByCostumeID(url:any,user_UUID:any,costumeID:any){
    return this.http.put(this.baseUrl+url+user_UUID+costumeID,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
  deleteCostume(url:any,id:any){
    return this.http.delete(this.baseUrl+url+id,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
  updateCostumeById(url:any,id:any, data:any){
    return this.http.put(this.baseUrl+url+id,data,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
  createCostume(url:any,data:any){
    return this.http.post(this.baseUrl+url,data,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token}) })
  }
}
