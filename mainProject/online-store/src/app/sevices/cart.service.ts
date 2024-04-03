import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId:number = JSON.parse(localStorage.getItem('user') || '').id;

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
// &populate=product.product_image   ?fields=%2A&populate=%2A
  fetchCart(){
    let finalUrl = this.cartUrl + `?filters[user_detail][id][$eq][0]=${this.userId}&populate=product.product_image&filters[order][id][$notNull]`;

    return this.http.get(finalUrl);
  }

  deleteFromCart(id:number){
    let finalUrl = this.cartUrl+'/'+id;
    return this.http.delete(finalUrl);
  }

  updateCart(id:number,data:any){
    let finalUrl = this.cartUrl+'/'+id;
    return this.http.put(finalUrl,data);
  }

}
