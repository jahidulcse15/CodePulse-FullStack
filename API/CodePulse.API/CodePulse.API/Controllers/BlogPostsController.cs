using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository  _blogPostRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository)
        {
            _blogPostRepository = blogPostRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto request)
        {
            var blogPost=await _blogPostRepository.CreateAsync(request);

            if(blogPost == null)
            {
                return BadRequest();
            }

            var response = new BlogPostDto
            {
                Id=blogPost.Id,
                Title= blogPost.Title,
                ShortDescription= blogPost.ShortDescription,
                Content= blogPost.Content,
                FeatureImageUrl= blogPost.FeatureImageUrl,
                UrlHandle= blogPost.UrlHandle,
                PublishedDate= blogPost.PublishedDate,
                Author= blogPost.Author,
                IsVisible= blogPost.IsVisible
            };

            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GettAllBlogPosts()
        {
            var blogPosts = await _blogPostRepository.GetAllAsync();

            List<BlogPostDto> response = new List<BlogPostDto>();

            foreach(var item in blogPosts)
            {
                var request = new BlogPostDto
                {
                    Id=item.Id,
                    Title=item.Title,
                    ShortDescription=item.ShortDescription,
                    Content=item.Content,
                    FeatureImageUrl=item.FeatureImageUrl,
                    Author=item.Author,
                    UrlHandle=item.UrlHandle,
                    PublishedDate=item.PublishedDate,
                    IsVisible=item.IsVisible
                };
                response.Add(request);
            }

            return Ok(response);
        }
        
    }
}
