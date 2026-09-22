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
        private readonly ICategoryRepository _categoryRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
        {
            _blogPostRepository = blogPostRepository;
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto request)
        {
            var blogPost = new BlogPost
            {
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeatureImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()

            };

            foreach(var item in request.Categories)
            {
                var existsCategoty = await _categoryRepository.FindByIdAsync(item);

                if(existsCategoty!= null)
                {
                    blogPost.Categories.Add(existsCategoty);
                }
            }

            var requett=await _blogPostRepository.CreateAsync(blogPost);

            if(requett == null)
            {
                return BadRequest();
            }

            var response = new BlogPostDto
            {
                Id = requett.Id,
                Title = requett.Title,
                ShortDescription = requett.ShortDescription,
                Content = requett.Content,
                FeatureImageUrl = requett.FeatureImageUrl,
                UrlHandle = requett.UrlHandle,
                PublishedDate = requett.PublishedDate,
                Author = requett.Author,
                IsVisible = requett.IsVisible,
                Categories = requett.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()

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
                    Id = item.Id,
                    Title = item.Title,
                    ShortDescription = item.ShortDescription,
                    Content = item.Content,
                    FeatureImageUrl = item.FeatureImageUrl,
                    Author = item.Author,
                    UrlHandle = item.UrlHandle,
                    PublishedDate = item.PublishedDate,
                    IsVisible = item.IsVisible,
                    Categories = item.Categories.Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        UrlHandle = c.UrlHandle
                    }).ToList()
                };
                response.Add(request);
            }

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var item = await _blogPostRepository.GetById(id);

            if(item is null)
            {
                return NotFound();
            }

            var response = new BlogPostDto
            {
                Id = item.Id,
                Title = item.Title,
                ShortDescription = item.ShortDescription,
                Content = item.Content,
                FeatureImageUrl = item.FeatureImageUrl,
                Author = item.Author,
                UrlHandle = item.UrlHandle,
                PublishedDate = item.PublishedDate,
                IsVisible = item.IsVisible,
                Categories = item.Categories.Select(c => new CategoryDto
                {
                    Id=c.Id,
                    Name=c.Name,
                    UrlHandle=c.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBlogPostById([FromRoute] Guid id, [FromBody] UpdateBlogPostRequestDto request)
        {
            var blogPost = new BlogPost
            {
                Id=id,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeatureImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()

            };


            foreach(var category in request.Categories)
            {
                var existingCategory = await _categoryRepository.FindByIdAsync(category);

                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            var blogPosts = await _blogPostRepository.UpdateAsync(blogPost);

            if (blogPosts == null)
            {
                return NotFound(); 
            }

            var response = new BlogPostDto
            {
                Id = blogPosts.Id,
                Title = blogPosts.Title,
                ShortDescription = blogPosts.ShortDescription,
                Content = blogPosts.Content,
                FeatureImageUrl = blogPosts.FeatureImageUrl,
                Author = blogPosts.Author,
                UrlHandle = blogPosts.UrlHandle,
                PublishedDate = blogPosts.PublishedDate,
                IsVisible = blogPosts.IsVisible,
                Categories = blogPosts.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            var blogPosts = await _blogPostRepository.DeleteAsync(id);

            if(blogPosts is null)
            {
                return NotFound();
            }

            var response = new BlogPostDto
            {
                Id = blogPosts.Id,
                Title = blogPosts.Title,
                ShortDescription = blogPosts.ShortDescription,
                Content = blogPosts.Content,
                FeatureImageUrl = blogPosts.FeatureImageUrl,
                Author = blogPosts.Author,
                UrlHandle = blogPosts.UrlHandle,
                PublishedDate = blogPosts.PublishedDate,
                IsVisible = blogPosts.IsVisible,
                Categories = blogPosts.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }
        
    }
}
