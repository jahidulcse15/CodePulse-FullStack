import { Component, inject, input } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogPostService } from '../../blogpost/blog-post-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent, JsonPipe],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails {

  route=inject(ActivatedRoute);
  url = input<string>();

  blogPostService = inject(BlogPostService);

  blogDetailsRef = this.blogPostService.getBlogPostByUrlHandle(this.url);

  isLoading = this.blogDetailsRef.isLoading;
  blogDetailsResponse = this.blogDetailsRef.value;


}