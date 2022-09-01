using MimeDetective;

namespace ECommerce.Helpers
{

    public class Mime
    {
         static ContentInspector interceptor = new ContentInspectorBuilder()
        {
            Definitions = MimeDetective.Definitions.Default.All()
        }.Build();

        public static string CheckFileTypeByMime(IFormFile formFile)
        {
          var results = interceptor.Inspect(formFile.FileName);

          var ResultsByMimeType = results.ByMimeType();

            return "";
        }
    }
}
