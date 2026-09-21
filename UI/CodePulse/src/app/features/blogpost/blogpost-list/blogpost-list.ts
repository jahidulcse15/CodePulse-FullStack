import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../blog-post-service';

@Component({
  imports: [RouterLink],
  selector: 'app-blogpost-list',
  styleUrl: './blogpost-list.css',
  templateUrl: './blogpost-list.html',
})
export class BlogpostList {
  blogPostService=inject(BlogPostService);

  getAllBlogPostRef=this.blogPostService.getAllBlogPosts();

  isLoading=this.getAllBlogPostRef.isLoading;
  error=this.getAllBlogPostRef.error;
  response=this.getAllBlogPostRef.value;
}
