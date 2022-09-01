using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models
{
    public class ProductBrand : BaseEntity
    {
        public string Name { get; set; }

        [ForeignKey("Type")]
        public int ProductTypeId { get; set; }
        public ProductType Type { get; set; }
    }
}