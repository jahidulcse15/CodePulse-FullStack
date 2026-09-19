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
  private categoryService = inject(CategoryService);
  private getAllCategoriesRef = this.categoryService.getAllCategories();

  isLoading = this.getAllCategoriesRef.isLoading;
  isError = this.getAllCategoriesRef.error;
  value = this.getAllCategoriesRef.value;

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Delete failed:', error);
      }
    });
  }
}