import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl: string = environment.basUrl + environment.cart;

  constructor(private http: HttpClient) { }

  addCart(data:any){
      // let data = {
      //   "data": {
      //     "product": 1,
      //     "quantity": 1,
      //     "user_detail": 1,
      //     "order": null
      //   }
      // }
      return this.http.post(this.cartUrl,data);
  }

  fetchCart(){
    return this.http.get(this.cartUrl);
  }

}
