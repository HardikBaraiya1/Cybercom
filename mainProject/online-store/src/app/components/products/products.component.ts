import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sevices/cart.service';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  cart: any;
  categories: { id: number, name: string }[] = [
    { id: -1, name: 'Choose Categories' }
  ];
  selectedCategoryId: number = -1;


  constructor(private productService: ProductService, private cartService: CartService) {

  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.filerCategWise(-1);
    this.fetchCategory();
    this.cartProducts();
  }

  pushData(data: any) {
    data.forEach((category: { id: any; attributes: { category_name: any; }; }) => {
      let newData = {
        id: category.id,
        name: category.attributes.category_name
      }
      this.categories.push(newData)
    });
    console.log(this.categories);
  }

  fetchCategory() {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.pushData(res.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  filerCategWise(id: number) {
    this.productService.filterProductsByCategories(id).subscribe({
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


cartProducts(){
  this.cartService.fetchCart().subscribe({
    next: (res:any)=>{
      console.log(res);
      this.cart = res.data;
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

}
