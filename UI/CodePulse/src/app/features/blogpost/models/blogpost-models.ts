import { Category } from "../../models/category.models";

export interface AddBlogPostRequest{
    title:string;
    shortDescription:string;
    content:string;
    featureImageUrl:string;
    urlHandle:string;
    publishedDate:Date;
    author:string;
    isVisible:boolean;
    categories:string[];
}

export interface BlogPost{
    id:string;
    title:string;
    shortDescription:string;
    content:string;
    featureImageUrl:string;
    urlHandle:string;
    publishedDate:Date;
    author:string;
    isVisible:boolean;
    categories:Category[];
}

export interface UpdateBlogPostRequest{
    title:string;
    shortDescription:string;
    content:string;
    featureImageUrl:string;
    urlHandle:string;
    publishedDate:Date;
    author:string;
    isVisible:boolean;
    categories:string[];
}