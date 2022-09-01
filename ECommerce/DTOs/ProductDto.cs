using ECommerce.Models;

namespace ECommerce.DTOs
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string ProductBrandName { get; set; }
        public string ProductTypeName { get; set; }


    }
}
