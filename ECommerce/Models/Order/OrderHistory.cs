
namespace ECommerce.Models.Order
{
    public class OrderHistory : BaseEntity
    {
        public Order Order { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public OrderHistoryAddress OrderHistoryAddress { get; set; }
        public string  EditorEmail { get; set; }
         
    }
}
