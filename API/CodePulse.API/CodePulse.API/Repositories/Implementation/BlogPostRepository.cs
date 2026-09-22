using Azure.Core;
using CodePulse.API.Controllers;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;
        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BlogPost?> CreateAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();

            return blogPost;
        }

        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
            var blogPost = await _context.BlogPosts.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);

            if (blogPost is null)
            {
                return null;
            }

            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();

            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            var blogPosts= await _context.BlogPosts.Include(c=>c.Categories).ToListAsync();

            return blogPosts;
        }


        public async Task<BlogPost>GetById(Guid id)
        {
            var blogPost = await _context.BlogPosts.Include(c=>c.Categories).FirstOrDefaultAsync(b => b.Id == id);
            return blogPost;
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost request)
        {
            var existingBlogPost = await _context.BlogPosts
                .Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (existingBlogPost == null)
                return null;

            // Update normal properties
            existingBlogPost.Title = request.Title;
            existingBlogPost.ShortDescription = request.ShortDescription;
            existingBlogPost.Content = request.Content;
            existingBlogPost.FeatureImageUrl = request.FeatureImageUrl;
            existingBlogPost.UrlHandle = request.UrlHandle;
            existingBlogPost.PublishedDate = request.PublishedDate;
            existingBlogPost.Author = request.Author;
            existingBlogPost.IsVisible = request.IsVisible;

            // Remove old category relationships
            existingBlogPost.Categories.Clear();

            // Add new category relationships
            foreach (var category in request.Categories)
            {
                existingBlogPost.Categories.Add(category);
            }

            await _context.SaveChangesAsync();

            return existingBlogPost;
        }
    }
}
