import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = environment.basUrl + environment.userProfile;

  // user:string =  localStorage.getItem('user') || '';

  constructor(private http: HttpClient) { }

  updateMobile(id:any,data:any){

      // const id = JSON.parse(this.user).id;
        const mobileUrl = environment.basUrl + environment.userUpdateMobile + id;
        
        return this.http.put(mobileUrl,data)
      }
  
  

  getUserDetails(){
    return this.http.get(this.userUrl);
  }
}
