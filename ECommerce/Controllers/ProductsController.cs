using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Errors;
using ECommerce.Helpers;
using ECommerce.Models;
using ECommerce.Repo;
using ECommerce.Services;
using ECommerce.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IUploadService uploadService;
        private readonly IConfiguration configuration;

        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper,IUploadService uploadService, IConfiguration configuration)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.uploadService = uploadService;
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productSpecParams);

            var countSpec = new ProductsWithFiltersForCountSpecification(productSpecParams);

            var totalItems = await unitOfWork.Repo<Product>().CountAsync(countSpec);

            var products = await unitOfWork.Repo<Product>().ListAsync(spec);

            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);


            return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex,productSpecParams.PageSize,totalItems,data) );

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product =  await unitOfWork.Repo<Product>().GetEntityWithSpec(spec);
            
            if (product == null) return NotFound(new ApiResponse(404));

            return mapper.Map<Product, ProductToReturnDto>(product);

        }

        [HttpGet("brands")]
        public async Task<ActionResult<ProductBrand>> GetBrands()
        {
            return Ok(await unitOfWork.Repo<ProductBrand>().ListAllAsync());

        }

        [HttpGet("brands/{id}")]
        public async Task<ActionResult<ProductBrand>> GetBrands(int id)
        {
            var spec = new BrandsRelativeToTypeSpec(id);
            return Ok(await unitOfWork.Repo<ProductBrand>().ListAsync(spec));

        }


        [HttpGet("types")]
        public async Task<ActionResult<ProductType>> GetTypes()
        {
            return Ok(await unitOfWork.Repo<ProductType>().ListAllAsync());

        }

        [Authorize(Roles = RoleTypes.SuperiorRole)]
        [HttpPost]
        public async Task<ActionResult<int>> AddProduct([FromForm]AddProductDto addDto)
        {
            var product = JsonConvert.DeserializeObject<ProductToAddDto>(addDto.ProductToAddDto);
            var mapped = mapper.Map<ProductToAddDto, Product>(product);

            if (addDto.File != null)
            {
                var extensions = new string[] { ".jpg", ".png",".jpeg" };
                var productType = await unitOfWork.Repo<ProductType>().GetByIdAsync(mapped.ProductTypeId);
                var saveTo = productType.Name + $@"\{addDto.File.FileName}";
                var tryToUpload = await uploadService.Upload(addDto.File, extensions, saveTo);
                if(tryToUpload.IsSucceeded)
                {
                    mapped.PictureUrl = configuration["UploadFolder"] + saveTo;
                }
                else
                {
                    return BadRequest( new ApiResponse(400,$"Maximum image size is: {tryToUpload.maxSize / 1024 / 1024}MB, And file extension must be image of type {extensions.Aggregate((a, b) => a + "," + b)}!. ") );
                }
            }
            else
            {
                mapped.PictureUrl = "uploads/404.png";
            }
            unitOfWork.Repo<Product>().Add(mapped);
            await  unitOfWork.Complete();
            return Ok(mapped.Id);
        }

        [Authorize(Roles = RoleTypes.SuperiorRole)]
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] AddProductDto addDto)
        {
            var product = JsonConvert.DeserializeObject<ProductToAddDto>(addDto.ProductToAddDto);
            var mapped = mapper.Map<ProductToAddDto, Product>(product);
            mapped.Id = id;
            if (addDto.File != null)
            {
                var extensions = new string[] { ".jpg", ".png", ".jpeg" };
                var productType = await unitOfWork.Repo<ProductType>().GetByIdAsync(mapped.ProductTypeId);
                var saveTo = productType.Name + $@"\{addDto.File.FileName}";
                var tryToUpload = await uploadService.Upload(addDto.File, extensions, saveTo);
                if (tryToUpload.IsSucceeded)
                {
                    mapped.PictureUrl = configuration["UploadFolder"] + saveTo;
                }
                else
                {
                    return BadRequest(new ApiResponse(400, $"Maximum image size is: {tryToUpload.maxSize / 1024 / 1024}MB, And file extension must be image of type {extensions.Aggregate((a, b) => a + "," + b)}!. "));
                }
            }
            else
            {
               var oldProduct = await unitOfWork.Repo<Product>().GetByIdAsync(id);
                unitOfWork.Repo<Product>().Detach(oldProduct);
                mapped.PictureUrl = oldProduct.PictureUrl;
            }
            unitOfWork.Repo<Product>().Update(mapped);
           await unitOfWork.Complete();
            return Ok();
        }

        [Authorize(Roles = RoleTypes.SuperiorRole)]
        [HttpPost("add-type")]
        public async Task<ActionResult<ProductType>> AddProductType(ProductType productType)
        {
            if (string.IsNullOrEmpty(productType.Name)) return BadRequest();
            unitOfWork.Repo<ProductType>().Add(productType);
           await unitOfWork.Complete();
            return Ok(productType);
        }

        [Authorize(Roles = RoleTypes.SuperiorRole)]
        [HttpDelete("{id}")]
        public async Task DeleteProduct(int id)
        {
            var productToDelete = new Product()
            {
                Id = id
            };
            unitOfWork.Repo<Product>().Delete(productToDelete);
            await unitOfWork.Complete();

        }

        [Authorize(Roles = RoleTypes.SuperiorRole)]
        [HttpPost("add-brand")]
        public async Task<ActionResult<ProductBrand>> AddProductBrand(ProductBrandDto productBrandDto)
        {
            var productBrand = mapper.Map<ProductBrandDto,ProductBrand>(productBrandDto);
            if (string.IsNullOrEmpty(productBrand.Name)) return BadRequest();

            unitOfWork.Repo<ProductBrand>().Add(productBrand);
           await unitOfWork.Complete();
            //TODO: return dto with include
            return Ok(productBrand);

        }
    }
}
