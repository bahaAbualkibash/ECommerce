using ECommerce.Models;

namespace ECommerce.Services
{
    public interface IUploadService
    {
        Task<Upload> Upload(IFormFile file, string[] extensions,string saveTo);
    }
}
