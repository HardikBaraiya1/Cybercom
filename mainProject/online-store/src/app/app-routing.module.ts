import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'checkout', component: CheckoutComponent },
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
