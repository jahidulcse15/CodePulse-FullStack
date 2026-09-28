using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost?> CreateAsync(BlogPost request);
        Task<IEnumerable<BlogPost>> GetAllAsync();
        Task<BlogPost> GetById(Guid id);
        Task<BlogPost?> GetByUrlHandle(string urlHandle);
        Task<BlogPost?> UpdateAsync(BlogPost blogPost);
        Task<BlogPost?> DeleteAsync(Guid id);
    }
}
