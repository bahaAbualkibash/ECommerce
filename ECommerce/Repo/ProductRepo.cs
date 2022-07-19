using ECommerce.Data;
using ECommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Repo
{
    public class ProductRepo : IProductRepo
    {
        private StoreContext _storeContext { get; set; }

        public ProductRepo(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }


        public async Task<Product> GetProductByIdAsync(int id)
        {

           return await _storeContext.Products.Include(p => p.ProductBrand)
                .Include(p => p.ProductType).SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _storeContext.Products.Include(p => p.ProductBrand)
                .Include(p => p.ProductType).ToListAsync();
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _storeContext.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _storeContext.ProductTypes.ToListAsync();
        }
    }
}
