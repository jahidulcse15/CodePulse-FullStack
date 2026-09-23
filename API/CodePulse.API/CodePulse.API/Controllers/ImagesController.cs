using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;
        public ImagesController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var image = await _imageRepository.GetAllAsync();

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }


        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file,[FromForm] string fileName,[FromForm] string title)
        {
            ValidateFileUploadForm(file);

            if (ModelState.IsValid)
            {
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    FileName = fileName,
                    Title = title,
                    //Url = file.FileName,
                    DateCreated= DateTime.Now
                };

                var blogImages = await _imageRepository.Upload(file, blogImage);

                return Ok(blogImages);
            }

            return BadRequest(ModelState);
        }

        private void ValidateFileUploadForm(IFormFile file)
        {
            var extension = new string[] { ".jpg", ".png",".jpeg", ".jfif" };

            if (!extension.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file","Unsupported file format");
            }

            if (file.Length > 10485760)
            {
                ModelState.AddModelError("file", "file size can not be allow more than 10MB.");
            }
        }
    }
}
