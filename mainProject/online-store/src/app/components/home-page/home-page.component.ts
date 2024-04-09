import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sevices/cart.service';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  
  products: any[] = [];
  cart: any[] = [];
  productState: number[] = [];

  constructor(private productService:ProductService,private cartService:CartService){}

  ngOnInit(): void {
    this.filerCategWise();
    this.cartProducts();
  }


  filerCategWise() {
    this.productService.getPremiumProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data;
        console.log(this.products)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  cartProducts(){
    this.cartService.fetchCart().subscribe({
      next: (res:any)=>{
        console.log(res);
        this.cart = res.data;
        this.cart.forEach(cartData => {
          this.productState.push(cartData.attributes.product.data.id);
        });
        console.log(this.productState)
      },
      error: (err:any)=>{
        console.log(err);
      }
    })
  }

  isProductInCart(id:number){
    const avail = this.productState.includes(id);
    console.log('id: ',id,'is avail: ',avail)
    return avail;
  }

  addToCart(productId:number,quantity:number=1){
    let userId: number = Number(JSON.parse(localStorage.getItem('user') || '').id);

    let cred = {
      "data": {
        "product": productId,
        "quantity": quantity,
        "user_detail": userId,
        "order": null
      }
    }
    console.log(cred);
    this.cartService.addCart(cred).subscribe({
      next: (res:any)=>{
        console.log(res);
        this.productState.push(productId);
      },
      error: (err:any)=>{
        console.log(err);
      }
    })
  }


}
