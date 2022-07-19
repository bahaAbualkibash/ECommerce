using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Helpers;
using ECommerce.Models;
using ECommerce.Repo;
using ECommerce.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenaricRepo<Product> productsRepo;
        private readonly IGenaricRepo<ProductBrand> productBrandRepo;
        private readonly IGenaricRepo<ProductType> productTypeRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenaricRepo<Product> productsRepo
            , IGenaricRepo<ProductBrand> productBrandRepo
            , IGenaricRepo<ProductType> productTypeRepo
            , IMapper mapper)
        {
            this.productsRepo = productsRepo;
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await productsRepo.ListAsync(spec);
            return Ok(mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product =  await productsRepo.GetEntityWithSpec(spec);

            return mapper.Map<Product, ProductToReturnDto>(product);

        }

        [HttpGet("brands")]
        public async Task<ActionResult<ProductBrand>> GetBrands()
        {
            return Ok(await productBrandRepo.ListAllAsync());

        }

        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetTypes()
        {
            return Ok(await productTypeRepo.ListAllAsync());

        }
    }
}
