import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/sevices/cart.service';
import { OrdersService } from 'src/app/sevices/orders.service';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit{
  userId = JSON.parse(localStorage.getItem('user') || '').id;
  ordered:boolean = false;


  // Ids: any[] = [];
  // allProducts: any[] = [
  //   {
  //     id: 1,
  //     name: 'Smartphone',
  //     description: 'A powerful smartphone with advanced features.',
  //     price: 599.99,
  //     quantity: 1,
  //     brand: 'XYZ',
  //     color: 'Black',
  //     screenSize: '6.5 inches',
  //     imageUrl: 'https://example.com/smartphone.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Laptop',
  //     description: 'A high-performance laptop for work and entertainment.',
  //     price: 1299.99,
  //     quantity: 1,
  //     brand: 'ABC',
  //     color: 'Silver',
  //     screenSize: '15.6 inches',
  //     imageUrl: 'https://images.pexels.com/photos/2506947/pexels-photo-2506947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  //   },
  //   {
  //     id: 3,
  //     name: 'Smart Watch',
  //     description: 'Stay connected and track your fitness with this smart watch.',
  //     price: 199.99,
  //     quantity: 1,
  //     brand: 'XYZ',
  //     color: 'Black',
  //     screenSize: '1.3 inches',
  //     imageUrl: 'https://example.com/smart-watch.jpg'
  //   },
  //   {
  //     id: 4,
  //     name: 'Wireless Headphones',
  //     description: 'Enjoy immersive audio with these wireless headphones.',
  //     price: 99.99,
  //     quantity: 1,
  //     brand: 'ABC',
  //     color: 'White',
  //     batteryLife: '20 hours',
  //     imageUrl: 'https://example.com/headphones.jpg'
  //   },
  //   {
  //     id: 5,
  //     name: 'Gaming Console',
  //     description: 'Experience the latest gaming titles with this powerful console.',
  //     price: 399.99,
  //     quantity: 1,
  //     brand: 'XYZ',
  //     color: 'Black',
  //     count: 1,
  //     storageCapacity: '1TB',
  //     imageUrl: 'https://example.com/gaming-console.jpg'
  //   }
  // ];
  cart: any[] = [];
  total_amount !: any;
  
  products: any[] = [];
  orderData: any[]=[];
  orderId:string = localStorage.getItem('orderId') || '';
  userPersonalInfo: any;
  userAddress: string = '';
  constructor(private orderService: OrdersService, private userService:UserService, private cartService:CartService){
    // this.getUserData();
    // this.loadData().then(()=> this.findTotal())
  }

  ngOnInit(): void {
    this.getUserData();
    this.loadData().then(()=> this.fillValues())
    // this.getCartData();
    // console.log('on init called',this.products)
  }


async loadData(){
  return new Promise<void>((resolve, reject) => {
    this.cartService.fetchCart().subscribe({
      next: (res: any) => {
        this.cart = res.data;
        console.log('cart data: ',this.cart);
        resolve(); // Resolve the promise when operation is complete
      },
      error: (err: any) => {
        console.log(err);
        reject(err); // Reject the promise if there's an error
      }
    });
  });
}

getUserData(){
  this.userService.getUserDetails().subscribe({
    next: (res:any)=>{
      this.userPersonalInfo = res;
      console.log('userDetails: ',this.userPersonalInfo, typeof(this.userPersonalInfo));
    },
    error: (err:any)=>{
      console.log(err);
    }
  })
}



  // async loadData() {
  //  return new Promise((resolve,reject)=>{
  //   this.orderService.getOrders().subscribe({
  //     next: (res:any) => {
  //       console.log(res);
  //       // this.findCurrentOrder(res.data,orderId);
  //      this.orderData = res.data;
  //      resolve(res.data);
  //     },
  //     error: (err:any) => {
  //       console.log(err);
  //       reject(err);
  //     }
  //    })
  //  })
  // }



  // findCurrentOrder():void {
  //   const data = this.orderData;
    
  //   console.log(data,this.orderId)
  //   // this.products = data.find((order: any) => order.attributes.order_id == Number(orderId));
  //   data.forEach((order: any)=> {
  //     if(order.attributes.order_id == this.orderId){
  //         this.products.push(order);
  //     }
  //   });
  //   console.log(this.products);
  // }
  


  fillValues(){
    this.total_amount = this.cart.reduce((total, item) => total + (item.attributes.quantity*item.attributes.product.data.attributes.price), 0);
    console.log(this.total_amount);
    let address = this.userPersonalInfo.user_addresses[0];
    this.userAddress = address.address_line_1 + ',' + address.address_line_2+ ',' + address.landmark + ',' + address.city.name
    console.log(this.userAddress);
    console.log('products: ',this.products)
  }

  placeOrder(){
      if(confirm('Confirm Payment ?')){
        let cred ={
          "data": {
            "order_id": this.userId + '_'+ String(new Date().getTime()),
            "order_date": new Date,
            "order_status": "Placed,",
            "order_status_updated_at": new Date,
            "tax_amount": this.total_amount*0.18,
            "total_amount": this.total_amount,
            "payable_amount": this.total_amount+(this.total_amount*0.18),
            "order_items": this.cart,
            "carts": this.cart
          }
        };
        
        this.orderService.placeOrder(cred).subscribe({
          next: (res:any) => {
            console.log(res);
            this.ordered = true;
            
            // localStorage.setItem('orderId',res.data.attributes.order_id);
            // alert('waiting for you')
          },
          error: (err:any) => {
            console.log(err)
          }
        })
      }
  }

}
