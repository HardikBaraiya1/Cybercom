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
  fetched: boolean = false;
  productState: number[] = [];
  cart: any;
  categories: { id: number, name: string }[] = [
    { id: -1, name: 'Choose Categories' }
  ];
  selectedCategoryId: number = -1;
  searchEl: string = '';

  // variables for pagination update
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  displayedProducts: any[] = [];
  pageArray: number[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {

  }


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.filerCategWise(-1);
    this.fetchCategory();
    this.cartProducts();
    // pagination area
    this.getProducts();
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
    this.fetched = false;
    this.productService.filterProductsByCategories(this.currentPage, this.pageSize, id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data;
        console.log(this.products)
        this.fetched = true;

      },
      error: (err: any) => {
        console.log(err);
        this.fetched = true;

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
  getProducts() {
    this.fetched = false;

    this.productService.fetchIncludingPaging(this.currentPage, this.pageSize).subscribe({
      next: (res: any) => {
        console.log(res);
        this.totalPages = res.meta.pagination.total;
        this.products = res.data;
        this.updatePageArray();
        console.log(this.products);
        this.fetched = true;

      },
      error: (err: any) => {
        console.log(err);
        this.fetched = true;

      }
    })
  }
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

  addToCart(productId: number, quantity: number = 1) {
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
      next: (res: any) => {
        console.log(res);
        this.productState.push(productId);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }


  cartProducts() {
    this.cartService.fetchCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cart = res.data;
        this.cart.forEach((cartData: { attributes: { product: { data: { id: number; }; }; }; }) => {
          this.productState.push(cartData.attributes.product.data.id);
        });
        console.log(this.productState)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  isProductInCart(id: number) {
    const avail = this.productState.includes(id);
    console.log('id: ', id, 'is avail: ', avail)
    return avail;

  }

  findProducts() {
    console.log('data is: ', this.searchEl);
    this.fetched = false;
    this.productService.findProducts(this.currentPage, this.pageSize, this.searchEl).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.data;
        console.log(this.products);
        this.fetched = true;
      },
      error: (err: any) => {
        console.log(err);
        this.fetched = true;
      }
    })
  }

  // pagination 
  generatePageArray(totalPages: number): number[] {
    let pages = Math.ceil(totalPages / this.pageSize);
    // console.log(this.pageSize,totalPages,pages);

    return Array.from({ length: pages }, (_, index) => index + 1);
  }

  updatePageArray(): void {
    this.pageArray = this.generatePageArray(this.totalPages);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
      this.getProducts();
    }
  }

}
