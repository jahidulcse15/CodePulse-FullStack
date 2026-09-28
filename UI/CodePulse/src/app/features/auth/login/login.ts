import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
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


   
  onSubmit(){
    console.log(this.loginFormGroup.value.email);
    console.log(this.loginFormGroup.value.password);
  }

   
}
