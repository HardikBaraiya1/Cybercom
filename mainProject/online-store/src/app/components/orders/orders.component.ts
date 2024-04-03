import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/sevices/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders:any;

  constructor(private orderService:OrdersService){

  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(){
    this.orderService.getOrders().subscribe({
      next: (res:any)=>{
        console.log(res);
        this.orders = res.data;
        // console.log(JSON.stringify(res.data));
      },
      error: (err:any)=>{
        console.log(err);
      }
    })
  }

  viewOrderDetails(order:any){
    console.log(order);
  }
  
}
