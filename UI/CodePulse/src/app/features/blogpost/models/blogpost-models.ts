
export interface AddBlogPostRequest{
    title:string;
    shortDescription:string;
    content:string;
    featureImageUrl:string;
    urlHandle:string;
    publishedDate:Date;
    author:string;
    isVisible:boolean;
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
}