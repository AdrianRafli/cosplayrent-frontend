import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl = 'https://cosplayrent.site/api/'
  //baseUrl = "http://localhost:8081/api/";

  token: any = "";
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("userToken") || "";
  }

  post(url: any, data: any) {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  get(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getCheckApp(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getCostumes(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getCategory(url:any){
    return this.http.get(this.baseUrl + url,{
      headers: new HttpHeaders({ Authorization:"Bearer " + this.token})
    })
  }

  getTransactionPaymentInfo(url:any,id:string){
    return this.http.get(this.baseUrl + url + id,{
      headers: new HttpHeaders({ Authorization:"Bearer " + this.token})
    })
  }

  getCostumesById(url: any, id: string) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getCostumesByName(url: any, search: string) {
    return this.http.get(this.baseUrl + url + search, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getReviewByCostumeId(url: any, costumeId: any) {
    return this.http.get(this.baseUrl + url + costumeId + "/review", {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getUserDetail(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getIdentityCard(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  updateIdentityCard(url: any, data: any) {
    return this.http.put(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  deleteAccount(url:any){
    return this.http.delete(this.baseUrl + url,{
      headers:new HttpHeaders({Authorization:"Bearer " + this.token}),
    })
  }

  getSellerStatus(url:any){
    return this.http.get(this.baseUrl + url,{
      headers:new HttpHeaders({Authorization:"Bearer " + this.token}),
    })
  }

  updateUserDetail(url: any, data: any) {
    return this.http.patch(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getBalance(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  checkUserBalanceWithOrderAmount(url: any, data: any) {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getSellerAddress(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getUserToOrderStatus(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getUserStatusToBeSeller(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  createOrderDirectlyToMidtrans(url: any, data: any) {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getHistoryBalance(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  SendTopUpOrder(url: any, data: any) {
    return this.http.put(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  updateSellerOrder(url: any, data: any) {
    return this.http.put(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getTopUpOrderStatus(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getSellerOrder(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getUserOrder(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getUserOrderDetail(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  getOrderDetailByOrderId(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  sendOrderDetailClientResponse(url: any, id: any, data: any) {
    return this.http.post(this.baseUrl + url + id, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  checkOrderStatus(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }

  updateUserProfile(url: any, id: any, data: any) {
    return this.http.put(this.baseUrl + url + id, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  getUserCostume(url: any, id: any) {
    return this.http.get(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  getSellerCostumeByCostumeID(url: any, user_UUID: any, costumeID: any) {
    return this.http.put(this.baseUrl + url + user_UUID + costumeID, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  getSellerCostume(url: any) {
    return this.http.get(this.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  deleteCostume(url: any, id: any) {
    return this.http.delete(this.baseUrl + url + id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  updateCostumeById(url: any, id: any, data: any) {
    return this.http.patch(this.baseUrl + url + id, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  createCostume(url: any, data: any) {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });
  }
  createOrder(url:any, data:any){
    return this.http.post(this.baseUrl+url,data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  getTransactionPayment(url:any){
    return this.http.get(this.baseUrl+url,{
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  postWishlist(url:any,id:any){
    return this.http.post(this.baseUrl+url+id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  kirimWishlist(url: any, id: any) {
    console.log("this is token",this.token)
    return this.http.post(this.baseUrl + url + id, {}, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    });    
  }
  deleteWishlist(url:any,id:any){
    return this.http.delete(this.baseUrl+url+id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  getWishlistStatsuById(url:any,id:any){
    return this.http.get(this.baseUrl+url+id, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  getAllWishlist(url:any){
    return this.http.get(this.baseUrl+url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }

  sendReview(url:any,data:any){
    return this.http.post(this.baseUrl+url,data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.token }),
    })
  }
}
