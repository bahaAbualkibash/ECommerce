using ECommerce.Models;

namespace ECommerce.Specifications
{
    public class BrandsRelativeToTypeSpec : BaseSpecification<ProductBrand>
    {
        public BrandsRelativeToTypeSpec(int typeId) : base(x => x.Type.Id == typeId)
        {

        }
    }
}
