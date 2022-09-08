using ECommerce.Models.Order;

namespace ECommerce.DTOs
{
    public class UpdateOrderStatusDto
    {
        public int Id { get; set; }
        public string? CancelReason { get; set; }
        public string OrderStatus { get; set; }
        public OrderHistoryAddressDto? OrderHistoryAddress { get; set; }
    }
}
