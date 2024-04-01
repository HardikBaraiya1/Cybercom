import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl : string = environment.basUrl + environment.login;
  registerUrl : string = environment.basUrl + environment.register;

  constructor(private http: HttpClient) { 

   }

  login(cred:any){
    return this.http.post(this.loginUrl,cred);
  }

  register(creadentials:any){
    return this.http.post(this.registerUrl,creadentials);
  }
}
