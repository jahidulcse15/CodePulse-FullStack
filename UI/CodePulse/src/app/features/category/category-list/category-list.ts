import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList {
   private categoryService=inject(CategoryService);
   private categoryServiceRef=this.categoryService.getAllCategories();

   isLoding=this.categoryServiceRef.isLoading;
   isError=this.categoryServiceRef.error;
   value=this.categoryServiceRef.value;
}