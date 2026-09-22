import { afterNextRender, Component, effect, inject, input } from '@angular/core';
import { BlogPostService } from '../blog-post-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { UpdateBlogPostRequest } from '../models/blogpost-models';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule,MarkdownComponent],
  selector: 'app-edit-blogpost',
  styleUrl: './edit-blogpost.css',
  templateUrl: './edit-blogpost.html',
})
export class EditBlogpost {
  id=input<string>();

  categoryService=inject(CategoryService);
  blogPostService=inject(BlogPostService);
  router=inject(Router);

  private blogPostRef=this.blogPostService.getBlogPostById(this.id);
  blogPostResponse=this.blogPostRef.value;

  categoriesRef=this.categoryService.getAllCategories();
  categoriesResponse=this.categoriesRef.value;

  editBlogPostForm=new FormGroup({
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

  effectRef=effect(()=>{
    if(this.blogPostResponse()){
      this.editBlogPostForm.patchValue({
      title:this.blogPostResponse()?.title,
      shortDescription:this.blogPostResponse()?.shortDescription,
      content:this.blogPostResponse()?.content,
      author:this.blogPostResponse()?.author,
      featureImageUrl:this.blogPostResponse()?.featureImageUrl,
      isVisible:this.blogPostResponse()?.isVisible,
      publishedDate:this.blogPostResponse()?.publishedDate,
      urlHandle:this.blogPostResponse()?.urlHandle,
      categories:this.blogPostResponse()?.categories.map(x=>x.id)
    })
    }
  });

  onSubmit(){
    const id=this.id();
     
    if(id&&this.editBlogPostForm.valid){
        const formRawValue=this.editBlogPostForm.getRawValue();
        const updateRequestDto:UpdateBlogPostRequest={
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


      this.blogPostService.editBlogPost(id,updateRequestDto).subscribe({
        next:(response)=>{
          this.router.navigate(['/admin/blogposts']);
        },
        error:()=>{
          console.log("somthing went wrong!");
        }
      });
    }
  }

  onDelete(){
    const id=this.id();
    if(id){
      this.blogPostService.deleteBlogPost(id)
      .subscribe({
        next:(response)=>{
          console.log("Delete Here.");
          this.router.navigate(['/admin/blogposts']);
        },
        error:()=>{
          console.error("somthing went wrong!");
        }
      })
    }
  }

}
