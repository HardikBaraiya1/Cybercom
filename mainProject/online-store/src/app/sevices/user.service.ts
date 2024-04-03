import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = environment.basUrl + environment.userProfile;
  stateUrl: string = environment.basUrl +  environment.stateUrl;
  cityUrl : string = environment.basUrl + environment.cityUrl;
  addressUrl: string = environment.basUrl + environment.addressUrl;

  // user:string =  localStorage.getItem('user') || '';

  constructor(private http: HttpClient) { }

  updateMobile(id:any,data:any){

      // const id = JSON.parse(this.user).id;
        const mobileUrl = environment.basUrl + environment.userUpdateMobile + id;
        
        return this.http.put(mobileUrl,data)
      }

  updateAddress(cred:any){
    return this.http.post(this.addressUrl,cred);
  }
  
  

  getUserDetails(){
    return this.http.get(this.userUrl);
  }

  getStates(){
    return this.http.get(this.stateUrl);
  }

  getcities(){
    return this.http.get(this.cityUrl);
  }

  // getStatesAndTheirCities(){
  //   const finalUrl = environment.stateUrl + '?populate=cities';
  //   return this.http.get(finalUrl);
  // }

  getCitiesFromState(id:any){
    const finalUrl = this.cityUrl + '?filters[state][id][$eq]=' + id;
    return this.http.get(finalUrl);
  }
}
