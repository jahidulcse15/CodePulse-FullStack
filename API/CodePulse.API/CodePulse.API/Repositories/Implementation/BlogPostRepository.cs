using CodePulse.API.Controllers;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
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

        public async Task<BlogPost?> CreateAsync(CreateBlogPostRequestDto request)
        {
            var blogPost = new BlogPost
            {
                Title= request.Title,
                ShortDescription= request.ShortDescription,
                Content= request.Content,
                FeatureImageUrl= request.FeatureImageUrl,
                UrlHandle= request.UrlHandle,
                PublishedDate= request.PublishedDate,
                Author= request.Author,
                IsVisible= request.IsVisible
                

            };

            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();

            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            var blogPosts= await _context.BlogPosts.ToListAsync();

            return blogPosts;
        }
    }
}
