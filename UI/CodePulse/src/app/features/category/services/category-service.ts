import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../../models/category.models';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private http=inject(HttpClient);
    private apiUrl='https://localhost:7133';

    addCategoryStatus=signal<'idle'|'loading'|'error'|'success'>('idle');

    addCategory(category:AddCategoryRequest){

        this.addCategoryStatus.set('loading');

        this.http.post<void>(`${this.apiUrl}/api/Categories`,category).subscribe({
            next:()=>{
                this.addCategoryStatus.set('success');
            },
            error:()=>{
                this.addCategoryStatus.set('error');
            }
        });
    }
    
    
    getAllCategories(){
        return httpResource<Category[]>(()=>`${this.apiUrl}/api/Categories`);
    }
}
