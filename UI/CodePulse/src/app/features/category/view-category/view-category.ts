import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-category',
  imports: [RouterLink],
  templateUrl: './view-category.html',
  styleUrl: './view-category.css',
})
export class ViewCategory {

  id = input<string>();

  private categoryService = inject(CategoryService);

  categoryResourceRef = this.categoryService.getCategoryById(this.id);

  categoryResponse = this.categoryResourceRef.value;

}