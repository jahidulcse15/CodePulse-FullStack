
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { AddBlogPostRequest, BlogPost } from './models/blogpost-models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class BlogPostService {
    http=inject(HttpClient);

    apiBaseUrl=environment.apiUrl;

    createBlogPost(data:AddBlogPostRequest):Observable<BlogPost>{
        return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogposts`,data);
    }

    getAllBlogPosts():HttpResourceRef<BlogPost[]|undefined>{
       return httpResource<BlogPost[]>(()=>`${this.apiBaseUrl}/api/blogposts`)
    }
}
