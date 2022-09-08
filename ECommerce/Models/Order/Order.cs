namespace ECommerce.Models.Order
{
    public class Order : BaseEntity
    {
        public Order()
        {

        }

        public Order(Address shipToAddress, DelivaryMethod delivaryMethod, IReadOnlyList<OrderItem> orderItems, string buyerEmail, decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DelivaryMethod = delivaryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;
        }

        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        public DelivaryMethod DelivaryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string? PaymentIntentId { get; set; }
        public string? CanceledReason { get; set; }
        
        public decimal GetTotal()
        {
            return Subtotal + DelivaryMethod.Price;
        }
    }
}
