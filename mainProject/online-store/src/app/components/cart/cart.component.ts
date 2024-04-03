import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { __await } from 'tslib';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/sevices/product.service';
import { CartService } from 'src/app/sevices/cart.service';
import { OrdersService } from 'src/app/sevices/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProducts: any[] = [];
  products: any[] = [];
  cart: any;
  oldCart: any;
  userId: number = Number(JSON.parse(localStorage.getItem('user') || '').id);


  constructor(private productService: ProductService, private cartService: CartService, private orderService: OrdersService, private router: Router) { }


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
        this.cartProducts(),
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
          console.log('products: ', this.allProducts);
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
          console.log('cart data: ', res);
          this.cart = res.data;
          this.oldCart = res.data;
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
    let tempProducts = this.allProducts.map(product => {
      const cartItem = this.cart.find((item: { attributes: { product: { data: { id: any; }; }; }; }) => item.attributes.product.data.id === product.id);
      if (cartItem) {
        // If the product is found in the cart, merge its quantity information
        return { ...product, cartId: cartItem.id, quantity: cartItem.attributes.quantity };
      }
    });

    tempProducts.forEach(product => {
      if (product) {
        this.products.push(product)
      }
    });
    console.log('Products are : ', this.products);
  }

  // addToCart(productId:number,quantity:number=1){
  //   let userId = localStorage.getItem('userId');
  //   let cred = {
  //     "data": {
  //       "product": productId,
  //       "quantity": quantity,
  //       "user_detail": userId,
  //       "order": null
  //     }
  //   }
  //   this.cartService.addCart(cred).subscribe({
  //     next: (res:any)=>{
  //       console.log(res);
  //     },
  //     error: (err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }






  removeFromCart(id: number) {
    this.cartService.deleteFromCart(id).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // sessionStorage.setItem('electroUser',JSON.stringify(cart));


  increaseQuantity(id: any) {
    this.products.forEach(product => {
      if (product.id === id)
        product.quantity++;
    });
  }

  decreaseQuantity(id: any) {
    this.products.forEach(product => {
      if (product.id === id && product.quantity > 1)
        product.quantity--;
    });
  }

  getTotalItems() {
    let total;
    console.log(this.cart)
    this.products.forEach(product => {

      this.cart.forEach((cart: { id: any; attributes: { quantity: any; }; }) => {
        console.log('changed',product.cartId,cart.id,'',cart.attributes.quantity,product.quantity);

        if(product.cartId == cart.id  && cart.attributes.quantity != product.quantity){
          console.log('changed')

      // const element = array[i];
      
      console.log('inside the loop');

        const cred = {
                "data": {
                  "product": product.id,
                  "quantity": product.quantity,
                  "user_detail": this.userId,
                  "order": null
                }
              }
              console.log(cred)
              this.cartService.updateCart(product.cartId, cred).subscribe({
                next: (res: any) => {
                  console.log('updated : ',res)
                },
                error: (err: any) => {
                  console.log(err)
                }
            
      })
    }
        
  });

});
if(confirm('Place order ?'))  this.router.navigate(['/checkout']);

}
    
    // this.products.forEach(product => {
    //   console.log(product)
    //   if (this.cart.attributes.quantity != product.quantity) {
    //     const cred = {
    //       "data": {
    //         "product": product.id,
    //         "quantity": product.quantity,
    //         "user_detail": this.userId,
    //         "order": null
    //       }
    //     }
    //     console.log(cred)
    //     this.cartService.updateCart(product.cartId, cred).subscribe({
    //       next: (res: any) => {
    //         console.log(res)
    //       },
    //       error: (err: any) => {
    //         console.log(err)
    //       }
    //     })
    //   }
    // });

    // total = this.products.reduce((total, item) => total + (item.quantity*item.attributes.price), 0);



  }




