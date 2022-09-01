using ECommerce.Models;
using System.Linq.Expressions;

namespace ECommerce.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams) 
            : base(x =>
                 (string.IsNullOrEmpty(productSpecParams.Search) || x.Name.Contains(productSpecParams.Search)) &&
                 (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId) &&
                 (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId)
                  )
        {

        }

    }
}
