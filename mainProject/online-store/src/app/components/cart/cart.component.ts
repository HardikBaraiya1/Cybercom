import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/sevices/product.service';
import { CartService } from 'src/app/sevices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    allProducts: any[] = [];
    products: any[] = [];
    cart: any;

    constructor(private productService: ProductService, private cartService: CartService, private router: Router) {}
  
  
    ngOnInit(): void {
      // // throw new Error('Method not implemented.');
      // this.filerCategWise(-1);
      // // this.fetchCategory();
      // this.cartProducts();
      // this.cartProductsAdding();
      this.fetchingData();
    }
  
 
    async fetchingData() {
      try {
        await Promise.all([
          this.filerCategWise(),
          this.cartProducts()
        ]);
        this.cartProductsAdding();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
      }
    }
    
    filerCategWise() {
      return new Promise<void>((resolve, reject) => {
        this.productService.filterProductsByCategories(-1).subscribe({
          next: (res: any) => {
            console.log(res);
            this.allProducts = res.data;
            console.log('products: ',this.allProducts);
            resolve(); // Resolve the promise when operation is complete
          },
          error: (err: any) => {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          }
        });
      });
    }
    
    cartProducts() {
      return new Promise<void>((resolve, reject) => {
        this.cartService.fetchCart().subscribe({
          next: (res: any) => {
            console.log(res);
            this.cart = res.data;
            resolve(); // Resolve the promise when operation is complete
          },
          error: (err: any) => {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          }
        });
      });
    }
    
// cartProductsAdding(){
//     this.products = this.allProducts.filter(product=>{
//       return this.cart.some((item: { id: any; })=>item.id==product.id);
//     })
//     console.log(this.products)
// }
 
cartProductsAdding() {
  this.products = this.allProducts.map(product => {
    const cartItem = this.cart.find((item: { id: any; }) => item.id === product.id);
    if (cartItem) {
      // If the product is found in the cart, merge its quantity information
      return { ...product, quantity: cartItem.attributes.quantity };
    } 
  });

  console.log(this.products);
}

  
    // fetchProducts() {
    //   this.productService.getAllProducts().subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.products = res.data;
    //       console.log(this.products)
    //     },
    //     error: (err: any) => {
    //       console.log(err)
    //     }
    //   })
    // }
  
    // addToCart(id: any) {
    //   console.log(id);
  
    //   if (sessionStorage.getItem('electroUser')) {
    //     this.cart = JSON.parse(sessionStorage?.getItem('electroUser') || '[]');
    //   }
    //   else {
    //     sessionStorage.setItem('electroUser', JSON.stringify([]));
    //   }
  
    //   if (!this.isProductInCart(id)) {
    //     // If not, add it to the cart
    //     this.cart.push(id);
    //   }
  
  
    //   sessionStorage.setItem('electroUser', JSON.stringify(this.cart));
    // }
  
    addToCart(productId:number,quantity:number=1){
      let userId = localStorage.getItem('userId');
      let cred = {
        "data": {
          "product": productId,
          "quantity": quantity,
          "user_detail": userId,
          "order": null
        }
      }
      this.cartService.addCart(cred).subscribe({
        next: (res:any)=>{
          console.log(res);
        },
        error: (err:any)=>{
          console.log(err);
        }
      })
    }
  
  

  
  isProductInCart(id:number){
    let avail = false;
    this.cart.forEach((product: { id: number; }) => {
      if(product.id == id)avail = true;
    });
    return avail;
  }
  
  


  removeFromCart(id: any) {
    console.log(id);
    // let cart = [];

    let newProduct = this.products[id]
    const index = this.products.findIndex(product => product.id == id);
    // console.log(index);
    if (index !== -1) {
      this.products.splice(index, 1);

      sessionStorage.setItem('electroUser', JSON.stringify(this.products));
    }

    // sessionStorage.setItem('electroUser',JSON.stringify(cart));
  }

  increaseQuantity(id: any) {
    this.products.forEach(product => {
      if (product.id === id)
        product.quantity++;
    });
  }

  decreaseQuantity(id: any) {
    this.products.forEach(product => {
      if (product.id === id && product.quantity > 0)
        product.quantity--;
    });
  }

  getTotalItems(){
    let total;
    if (sessionStorage.getItem('checkoutTotal'))
      total = JSON.parse(sessionStorage.getItem('checkoutTotal') || '0')
    else {
      total = 0;
    }
    ;

    total = this.products.reduce((total, item) => total + (item.quantity*item.price), 0);
    sessionStorage.setItem('checkoutTotal',JSON.stringify(total));
    this.router.navigate(['/checkout']);
  }


}
