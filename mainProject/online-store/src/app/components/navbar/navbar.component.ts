import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sevices/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'online-store';
  isLoggedIn:boolean = false;

  constructor(private productService: ProductService){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.checkLogIn();
  }


  checkLogIn(){
    if(localStorage.getItem('user')){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  login(){
    // localStorage.clear();
    window.location.href = '/log-in'
  }
  logout(){
    localStorage.clear();
    window.location.href = '/home'
  }

}
