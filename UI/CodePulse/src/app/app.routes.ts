import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { ViewCategory } from './features/category/view-category/view-category';
import { DeleteCategory } from './features/category/delete-category/delete-category';
import { BlogpostList } from './features/blogpost/blogpost-list/blogpost-list';
import { AddBlogpost } from './features/blogpost/add-blogpost/add-blogpost';
import { EditBlogpost } from './features/blogpost/edit-blogpost/edit-blogpost';
import { Home } from './features/public/home/home';
import { BlogDetails } from './features/public/blog-details/blog-details';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { adminGuard } from './features/auth/guards/admin-guard';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
       path: 'blog/:url',
       component: BlogDetails,
    },
    {
        path:'admin/categories',
        component:CategoryList,
        canActivate:[adminGuard]
    },
    {
        path:'admin/categories/add',
        component:AddCategory,
        canActivate:[adminGuard]
    },
    {
        path:"admin/categories/edit/:id",
        component:EditCategory,
        canActivate:[adminGuard]
    },
    {
        path:"admin/categories/view/:id",
        component:ViewCategory,
        canActivate:[adminGuard]
    },
    {
        path:"admin/categories/delete/:id",
        component:DeleteCategory,
        canActivate:[adminGuard]
    },
    {
        path:"admin/blogposts",
        component:BlogpostList,
        canActivate:[adminGuard]
    },
    {
        path:"admin/blogposts/add",
        component:AddBlogpost,
        canActivate:[adminGuard]
    },
    {
        path:"admin/blogposts/edit/:id",
        component:EditBlogpost,
        canActivate:[adminGuard]
    },
    {
        path:"login",
        component:Login
    },
     {
        path: 'register',
        component: Register
    }
    
];
