import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../../blogpost/blog-post-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink,DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  blogPostService = inject(BlogPostService);

  blogPostsRef = this.blogPostService.getAllBlogPosts();
  isLoading = this.blogPostsRef.isLoading;
  blogPostsResponse = this.blogPostsRef.value;
}