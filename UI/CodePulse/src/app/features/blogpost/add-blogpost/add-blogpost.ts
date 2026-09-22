import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPostService } from '../blog-post-service';
import { AddBlogPostRequest } from '../models/blogpost-models';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';

@Component({
  imports: [ReactiveFormsModule,MarkdownComponent],
  standalone:true,
  selector: 'app-add-blogpost',
  styleUrl: './add-blogpost.css',
  templateUrl: './add-blogpost.html',
})
export class AddBlogpost {

  blogpostService=inject(BlogPostService)
  categoryService=inject(CategoryService);
  router=inject(Router);

  private categoryResourseRef=this.categoryService.getAllCategories();
  categoryResonse=this.categoryResourseRef.value;

  addBlogPostForm=new FormGroup({
    title:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)]
    }),
    shortDescription:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(300)]
    }),
    content:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10)]
    }),
    featureImageUrl:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(200)]
    }),
    urlHandle:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(200)]
    }),
    publishedDate:new FormControl<Date>(new Date(),{
      nonNullable:true,
      validators:[Validators.required]
    }),
    author:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]
    }),
    isVisible:new FormControl<boolean>(false,{
      nonNullable:true,
      
    }),

    categories:new FormControl<string[]>([])

  });

  onSubmit(){
    const formRawValue=this.addBlogPostForm.getRawValue();

    const requestDto:AddBlogPostRequest={
       title:formRawValue.title,
       shortDescription:formRawValue.shortDescription,
       content:formRawValue.content,
       author:formRawValue.author,
       featureImageUrl:formRawValue.featureImageUrl,
       isVisible:formRawValue.isVisible,
       urlHandle:formRawValue.urlHandle,
       publishedDate:new Date(formRawValue.publishedDate),
       categories:formRawValue.categories ?? []

    };

    this.blogpostService.createBlogPost(requestDto).subscribe({
      next:(response)=>{
        console.log(response);

        this.router.navigate(['/admin/blogposts']);
      },
      error:()=>{
        console.error("something went wrong!");
      }
    });

  }

}
