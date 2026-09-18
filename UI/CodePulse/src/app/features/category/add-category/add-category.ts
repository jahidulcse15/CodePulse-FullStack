import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, validate } from '@angular/forms/signals';
import { AddCategoryRequest } from '../../models/category.models';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule,CommonModule],
  selector: 'app-add-category',
  styleUrl: './add-category.css',
  templateUrl: './add-category.html',
})
export class AddCategory {

  private router=inject(Router)

  constructor(){

    effect(()=>{
      if(this.categoryService.addCategoryStatus()==='success'){
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if(this.categoryService.addCategoryStatus()==='error'){
        console.log('addcategory request failed');
      }
     })

  }

  private categoryService=inject(CategoryService);

   addcategoryFormContol=new FormGroup({

    name:new FormControl<string>('',{nonNullable:true,validators:[
      Validators.required,
      Validators.minLength(3)
    ]}),
    urlHandle:new FormControl<string>('',{nonNullable:true,validators:[
      Validators.required,
      Validators.minLength(3)
    ]})

   });

   onSubmit(){

    
    
     console.log(this.addcategoryFormContol.value);
     
     const addCategoryRequestDto:AddCategoryRequest={
        name:this.addcategoryFormContol.getRawValue().name,
        urlHandle:this.addcategoryFormContol.getRawValue().urlHandle
     };

     this.categoryService.addCategory(addCategoryRequestDto);

     
   }

}
