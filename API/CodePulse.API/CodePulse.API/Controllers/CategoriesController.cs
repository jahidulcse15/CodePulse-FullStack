using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

            await _categoryRepository.CreateAsync(category);

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categoryList = await _categoryRepository.GetAllAsync();

            var response = new List<CategoryDto>();

            foreach (var item in categoryList)
            {
                var category = new CategoryDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    UrlHandle = item.UrlHandle
                };
                response.Add(category);
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>GetById(Guid id)
        {
            var category=await _categoryRepository.FindByIdAsync(id);

            var response = new CategoryDto
            {
                Id=category.Id,
                Name=category.Name,
                UrlHandle=category.UrlHandle
            };

            return Ok(response);
        }
    }
}
