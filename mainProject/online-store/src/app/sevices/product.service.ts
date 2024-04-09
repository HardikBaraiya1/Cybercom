import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  caterogryUrl : string = environment.basUrl + environment.categories;

  productUrl: string = environment.basUrl + environment.products;
// pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=&filters[category][id][$eqi][1]=3

// &filters[category][id][$eqi][1]=1

  constructor(private http:HttpClient) { }

  getPremiumProducts(){
    let finalUrl = this.productUrl + '&filters[category][id][$eqi][1]=5';
    console.log(finalUrl)
    return this.http.get(finalUrl);
  }


  filterProductsByCategories(start:any,end:any,id:number){
    console.log(id)
    let url = this.productUrl + `&pagination[page]=${start}&pagination[pageSize]=${end}`;

    let finalUrl = (id==-1)?  url : url + '&filters[category][id][$eqi][1]=' + id;
    console.log(finalUrl)
    return this.http.get(finalUrl);
  }

  fetchIncludingPaging(start:any,end:any){
    let finalUrl = this.productUrl + `&pagination[page]=${start}&pagination[pageSize]=${end}`
    console.log(finalUrl)
    return this.http.get(finalUrl);
  }

  findProducts(start:any,end:any,data:string){
    let finalUrl = this.productUrl + `&pagination[page]=${start}&pagination[pageSize]=${end}` + '&filters[product_name][$containsi][0]=' + data;
    console.log(finalUrl)
    return this.http.get(finalUrl)
  }

  getAllProducts(){
      return this.http.get(this.productUrl);
  }

  getCategories(){
    return this.http.get(this.caterogryUrl);
  }
}
