import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  
  products: any[] = [
    {
      id: 1,
      name: 'Smartphone',
      description: 'A powerful smartphone with advanced features.',
      price: 599.99,
      brand: 'XYZ',
      color: 'Black',
      screenSize: '6.5 inches',
      imageUrl: 'https://example.com/smartphone.jpg'
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'A high-performance laptop for work and entertainment.',
      price: 1299.99,
      brand: 'ABC',
      color: 'Silver',
      screenSize: '15.6 inches',
      imageUrl: 'https://images.pexels.com/photos/2506947/pexels-photo-2506947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Smart Watch',
      description: 'Stay connected and track your fitness with this smart watch.',
      price: 199.99,
      brand: 'XYZ',
      color: 'Black',
      screenSize: '1.3 inches',
      imageUrl: 'https://example.com/smart-watch.jpg'
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      description: 'Enjoy immersive audio with these wireless headphones.',
      price: 99.99,
      brand: 'ABC',
      color: 'White',
      batteryLife: '20 hours',
      imageUrl: 'https://example.com/headphones.jpg'
    },
    {
      id: 5,
      name: 'Gaming Console',
      description: 'Experience the latest gaming titles with this powerful console.',
      price: 399.99,
      brand: 'XYZ',
      color: 'Black',
      storageCapacity: '1TB',
      imageUrl: 'https://example.com/gaming-console.jpg'
    }
  ];
  

  addToCart(id:any){
    console.log(id);
    let cart = []

    if(sessionStorage.getItem('electroUser')){
      cart = JSON.parse(sessionStorage?.getItem('electroUser') || '[]');
    }
    else{
      sessionStorage.setItem('electroUser', JSON.stringify([]));
    }

    let newProduct = this.products[id]
    cart.push(newProduct);

    sessionStorage.setItem('electroUser',JSON.stringify(cart));
  }
}
