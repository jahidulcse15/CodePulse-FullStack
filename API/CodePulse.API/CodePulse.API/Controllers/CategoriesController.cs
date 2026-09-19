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
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
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

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult>GetById([FromRoute] Guid id)
        {
            var category=await _categoryRepository.FindByIdAsync(id);

            if(category is null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id=category.Id,
                Name=category.Name,
                UrlHandle=category.UrlHandle
            };

            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> EditCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            var category = new Category
            {
                Id=id,
                Name=updateCategoryRequestDto.Name,
                UrlHandle=updateCategoryRequestDto.UrlHandle
            };

            var response = await _categoryRepository.UpdateAsync(category);

            if (response == null)
            {
                return NotFound();
            }

            var responseDto = new CategoryDto
            {
                Id=category.Id,
                Name = response.Name,
                UrlHandle=response.UrlHandle
            };

            return Ok(responseDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var category = await _categoryRepository.DeleteAsync(id);

            if (category == null)
            {
                return BadRequest("This Category is not found.");
            }

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }
    }
}
