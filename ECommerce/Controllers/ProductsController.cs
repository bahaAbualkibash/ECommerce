using ECommerce.Models;
using ECommerce.Repo;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepo productRepo;

        public ProductsController(IProductRepo productRepo)
        {
            this.productRepo = productRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            return Ok(await productRepo.GetProductsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return Ok(await productRepo.GetProductByIdAsync(id));

        }

        [HttpGet("brands")]
        public async Task<ActionResult<Product>> GetBrands()
        {
            return Ok(await productRepo.GetProductBrandsAsync());

        }

        [HttpGet("types")]
        public async Task<ActionResult<Product>> GetTypes()
        {
            return Ok(await productRepo.GetProductTypesAsync());

        }
    }
}
