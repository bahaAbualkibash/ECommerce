using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Models;
using ECommerce.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepo basketRepo;
        private readonly IMapper mapper;

        public BasketController(IBasketRepo basketRepo,IMapper mapper)
        {
            this.basketRepo = basketRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await basketRepo.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var updatedBasket = await basketRepo.UpdateBasketAsync(mapper.Map<CustomerBasketDto,CustomerBasket>(basket));

            return Ok(updatedBasket);

        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
          await basketRepo.DeleteBasketAsync(id);

        }
    }
}
