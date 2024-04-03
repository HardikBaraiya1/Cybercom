import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderUrl: string = environment.basUrl + environment.orders;

  constructor(private http:HttpClient) { }


  placeOrder(cred:any){
    return this.http.post(this.orderUrl,cred);
  }
  getOrders(){
    return this.http.get(this.orderUrl);
  }

  getOrderById(id:string){
    let finalUrl = this.orderUrl+'/'+id;
    console.log(finalUrl)
    return this.http.get(finalUrl)
  }

}
