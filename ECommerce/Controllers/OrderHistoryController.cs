using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Errors;
using ECommerce.Helpers;
using ECommerce.Models.Order;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = RoleTypes.SuperiorRole)]
    public class OrderHistoryController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IOrderService orderService;

        public OrderHistoryController(IMapper mapper, IOrderService orderService)
        {
            this.mapper = mapper;
            this.orderService = orderService;
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateOrderStatus(UpdateOrderStatusDto orderDto)
        {
            var oldStatus = await orderService.GetOrderByIdAsync(orderDto.Id);
            var order = mapper.Map<UpdateOrderStatusDto, Order>(orderDto);
            var orderHistoryAddress = mapper.Map<UpdateOrderStatusDto, OrderHistoryAddress>(orderDto);


            if (order.Status == OrderStatus.Delivered)
            {
                return BadRequest(new ApiResponse(400, "Order is already delivered!"));
            }

            await orderService.UpdateOrderStatus(order);

            var orderHistory = new OrderHistory()
            {
                EditorEmail = User.FindFirst(ClaimTypes.Email).Value,
                LastModifiedDate = DateTime.Now,
                Order = order,
                OrderHistoryAddress = orderHistoryAddress,
                Status = order.Status
            };

            orderService.CreateHistory(orderHistory);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem updating order"));


            return Ok();

        }
    }
}
