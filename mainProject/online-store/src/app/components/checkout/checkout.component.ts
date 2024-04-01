import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit{
  userEmail = 'example@example.com';
  userMobile = '1234567890';
  userAddress = '123 Street, City, Country';

  Ids: any[] = [];
  allProducts: any[] = [
    {
      id: 1,
      name: 'Smartphone',
      description: 'A powerful smartphone with advanced features.',
      price: 599.99,
      quantity: 1,
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
      quantity: 1,
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
      quantity: 1,
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
      quantity: 1,
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
      quantity: 1,
      brand: 'XYZ',
      color: 'Black',
      count: 1,
      storageCapacity: '1TB',
      imageUrl: 'https://example.com/gaming-console.jpg'
    }
  ];

  products: any[] = [];


  ngOnInit(): void {
    this.loadData();
    // console.log('on init called',this.products)
  }

  async loadData() {
    this.Ids = (sessionStorage.getItem('electroUser')) ? JSON.parse(sessionStorage.getItem('electroUser') || '[]') : [];
    // this.allProducts = (localStorage.getItem('products'))? JSON.parse(localStorage.getItem('products') || '[]') : [];

    for (const index in this.allProducts) {
      if (this.Ids.includes(this.allProducts[index].id))
        this.products.push(this.allProducts[index])
    }
    // console.log('called', this.products)

  }

  getSubtotal(): number {
    return this.products.reduce((total, item) => {
      const product = this.products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getGST(): number {
    const subtotal = this.getSubtotal();
    return subtotal * 0.18; // 18% GST
  }

  getTotal(): number {
    return this.getSubtotal() + this.getGST();
  }
}
