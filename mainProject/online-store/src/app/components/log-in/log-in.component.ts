import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevices/auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
    loginForm: FormGroup;
    loginMode: boolean = true;
    registerForm: FormGroup;
    
    constructor(private authService: AuthService, private route:Router){
      this.loginForm = new FormGroup({

        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required,Validators.minLength(6)])

      });

      this.registerForm = new FormGroup({

        email: new FormControl('', [Validators.required,Validators.email]),
        username: new FormControl('',Validators.required),
        password: new FormControl('',[Validators.required,Validators.minLength(6)])
      })
    }



    register(){
      if(this.registerForm.valid){
        // console.log('Register Successfully...')
        const cred = {
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };

        this.authService.register(cred).subscribe({
          next: (res:any) => console.log(res),
          error: (err:any) => console.log(err)
        })

      }else{
        console.log('Register Unsuccessfull..');
        this.registerForm.markAllAsTouched();
      }

    }

    Login(){
      if(this.loginForm.valid){
        // console.log('Form valid...');
        const cred = {
          "identifier" : this.loginForm.value.email,
          "password": this.loginForm.value.password
      };
      this.authService.login(cred).subscribe({
        next: (res:any) =>{
          localStorage.setItem('token',JSON.stringify(res.jwt))
          localStorage.setItem('user',JSON.stringify({id:res.user.id,name:res.user.username}))

          // console.log(res);
          // this.route.navigate(['/home']);
          window.location.href = '/home';

        },
        error: (err:any) => console.log(err)
      })
      }else{
        console.log('form Invalid...')
        this.loginForm.markAllAsTouched();
      }
    }


    toggleMode(){
      this.loginMode = !this.loginMode;
    }
}
