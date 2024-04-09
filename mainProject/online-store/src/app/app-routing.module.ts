import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { authGuard } from './sevices/guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'profile', component: AccountComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'log-in', component: LogInComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { 
    path: '**', 
    component: NotFoundComponent
    // redirectTo: '/home'
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
