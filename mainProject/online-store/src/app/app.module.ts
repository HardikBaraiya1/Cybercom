import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AccountComponent } from './components/account/account.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InteceptorInterceptor } from './sevices/interceptor/inteceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AccountComponent,
    HomePageComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InteceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
