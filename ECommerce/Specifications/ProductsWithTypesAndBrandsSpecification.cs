using ECommerce.Models;
using System.Linq.Expressions;

namespace ECommerce.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productSpecParams)
            :base( x =>
                 ( string.IsNullOrEmpty( productSpecParams.Search) || x.Name.Contains(productSpecParams.Search) )&&
                 ( !productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId )&&
                 ( !productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId )
                 )
            {           

            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);
            if (!string.IsNullOrEmpty(productSpecParams.Sort))
            {
                switch (productSpecParams.Sort) 
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    case "nameAsc":
                        AddOrderBy(x => x.Name);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(x => x.Name);
                        break;
                    default:
                        break;

                }
            }

        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
