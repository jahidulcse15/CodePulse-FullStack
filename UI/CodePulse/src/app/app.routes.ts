import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { ViewCategory } from './features/category/view-category/view-category';
import { DeleteCategory } from './features/category/delete-category/delete-category';

export const routes: Routes = [
    {
        path:'admin/categories',
        component:CategoryList
    },
    {
        path:'admin/categories/add',
        component:AddCategory
    },
    {
        path:"admin/categories/edit/:id",
        component:EditCategory
    },
    {
        path:"admin/categories/view/:id",
        component:ViewCategory
    },
    {
        path:"admin/categories/delete/:id",
        component:DeleteCategory
    }
    
];
