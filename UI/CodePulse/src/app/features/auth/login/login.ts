import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  authService=inject(AuthService);
  router=inject(Router);

  loginFormGroup=new FormGroup({
    email:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    password:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  });


  get emailFormControl(){
    return this.loginFormGroup.controls.email;
  }

  get passwordFormControl(){
    return this.loginFormGroup.controls.password;
  }
   
  onSubmit(){
     const formRawvalue=this.loginFormGroup.getRawValue();

     this.authService.login(formRawvalue.email,formRawvalue.password)
     .subscribe({
      next:(response)=>{
        this.router.navigate(['']);
      },
      error:()=>{
        console.log('somthing is wrong!');
      }
     });
  }

   
}
