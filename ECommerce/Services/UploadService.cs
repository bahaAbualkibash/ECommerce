using ECommerce.Models;

namespace ECommerce.Services
{
    public class UploadService : IUploadService
    {
        private const int MAXFILESIZE = 15728640;
        private string[] _extensions;
        private readonly IWebHostEnvironment hostingEnvironment;

        public UploadService(IWebHostEnvironment environment)
        {
            hostingEnvironment = environment;
        }



        public async Task<Upload> Upload(IFormFile file, string[] extensions,string saveTo)
        {
            _extensions = extensions;
            if (_extensions.Contains(Path.GetExtension(file.FileName).ToLower()) && file.Length <= MAXFILESIZE)
            {

                var uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                var uploadDest = uploads + "\\" + saveTo;
                var f =Directory.GetParent(uploadDest).FullName;
                if (!Directory.Exists( Directory.GetParent( uploadDest).FullName))
                {
                    Directory.CreateDirectory(uploads + "\\" + saveTo);

                }

                using (var stream = System.IO.File.Create(uploadDest))
                {
                    await file.CopyToAsync(stream);
                }
                return new Upload()
                {
                    IsSucceeded = true,
                    maxSize = MAXFILESIZE
                };
            }
            else
            {
                return new Upload()
                {
                    IsSucceeded = false,
                };
            }
        }
    }
}
