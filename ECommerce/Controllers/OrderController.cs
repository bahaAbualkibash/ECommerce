using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Errors;
using ECommerce.Helpers;
using ECommerce.Models.Order;
using ECommerce.Services;
using ECommerce.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService orderService,IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOrder(OrderDto orderDto)
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var address = mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await orderService.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            var orderItemDto = mapper.Map<Order, OrderToReturnDto>(order);

            return orderItemDto;
        }



        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var orders = await orderService.GetOrdersForUserAsync(email);

            return Ok(mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("all")]
        [Authorize(Roles = RoleTypes.SuperiorRole)]
        public async Task<ActionResult<Pagination<OrderToReturnDto>>> GetOrdersForAllUsers([FromQuery] OrderSpecParams orderSpecParams)
        {
            
            var orders = await orderService.GetOrdersForAllUserAsync(orderSpecParams);

            var countSpec = new OrderWithFiltersForCountSpec(orderSpecParams);

            var totalOrders = await orderService.GetOrdersCountAsync(countSpec);

            var data = mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders);

            return new Pagination<OrderToReturnDto>(orderSpecParams.PageIndex,orderSpecParams.PageSize,totalOrders,data);
        }

        [HttpGet("all/{id}")]
        [Authorize(Roles = RoleTypes.SuperiorRole)]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id,[FromHeader]string email)
        {
            var order = await orderService.GetOrderByIdAsync( id, email);

            if (order == null) return NotFound(new ApiResponse(404));

            return mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var order = await orderService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound(new ApiResponse(404));

            return mapper.Map<Order,OrderToReturnDto>(order);
        }

        [HttpGet("delivaryMethods")]
        public async Task<IReadOnlyList<DelivaryMethod>> GetDelivaryMethods()
        {
            return await orderService.GetDelivaryMethodsAsync();
        }
    }
}
