namespace ECommerce.DTOs
{
    public class AddProductDto
    {
        public IFormFile? File { get; set; }
        public string ProductToAddDto { get; set; }
    }

    public class ProductToAddDto
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductPictureUrl { get; set; }
        public string ProductBrandId { get; set; }
        public string ProductTypeId { get; set; }
    }
}
