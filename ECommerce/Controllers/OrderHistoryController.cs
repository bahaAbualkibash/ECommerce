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
    [Authorize(Roles = RoleTypes.SuperiorRole)]
    public class OrderHistoryController : ControllerBase
    {
        //TODO: Add Select to Specification List
        //TODO: Add Distinct to Specification List
        private readonly IMapper mapper;
        private readonly IOrderService orderService;

        public OrderHistoryController(IMapper mapper, IOrderService orderService)
        {
            this.mapper = mapper;
            this.orderService = orderService;
        }

        [HttpPatch]
        public async Task<ActionResult<IReadOnlyList<OrderHistoryStatusDto>>> UpdateOrderStatus(UpdateOrderStatusDto orderDto)
        {

            var newStatus = await orderService.GetOrderByIdAsync(orderDto.Id);
            var order = mapper.Map<UpdateOrderStatusDto, Order>(orderDto);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem updating order"));

            if (newStatus.Status == OrderStatus.Delivered)
            {
                if(order.Status == OrderStatus.Canceled)
                {
                    return BadRequest(new ApiResponse(400, "Order is Delivered! Status can't be updated to canceled"));
                }
                return BadRequest(new ApiResponse(400, "Order is already delivered!"));
            }

            newStatus.Status = order.Status;
            var orderHistoryAddress = mapper.Map<OrderHistoryAddressDto, OrderHistoryAddress>(orderDto.OrderHistoryAddress);

            if (order.Status == OrderStatus.Canceled && !string.IsNullOrEmpty(orderDto.CancelReason))
            {
                newStatus.CanceledReason = orderDto.CancelReason;
            }



            orderService.UpdateOrderStatus(newStatus);

            var orderHistory = new OrderHistory()
            {
                EditorEmail = User.FindFirst(ClaimTypes.Email).Value,
                LastModifiedDate = DateTime.Now,
                Order = newStatus,
                OrderHistoryAddress = orderHistoryAddress,
                Status = order.Status
            };

            await orderService.CreateHistory(orderHistory);

            var orderHistoryDto = await NormalizeOrderHistoryStatus(newStatus.Id);

            return Ok(orderHistoryDto);

        }

        [HttpGet("{id}")]
        public async Task<IReadOnlyList<string>> GetOrderHistoryStatus(int id)
        {
             
            return await NormalizeOrderHistoryStatus(id);

        }

        private async Task<IReadOnlyList<string>> NormalizeOrderHistoryStatus(int id)
        {

            var ordersHistory = await orderService.GetOrderHistoriesAsync(id);
            var orderHistoryDto = mapper.Map<IReadOnlyList<OrderHistory>, IReadOnlyList<OrderHistoryStatusDto>>(ordersHistory);

            var orderHistoryArray = orderHistoryDto.Select(x => x.OrderStatus).Distinct().ToList();


            return orderHistoryArray;

        }
    }
}
