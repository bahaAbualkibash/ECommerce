using ECommerce.Models.Order;

namespace ECommerce.Specifications
{
    public class OrderHistoryForOrderSpecification :BaseSpecification<OrderHistory>
    {
        public OrderHistoryForOrderSpecification(int orderId) : base(x => x.Order.Id == orderId)
        {
            AddInclude(x => x.Order);
            AddInclude(x => x.OrderHistoryAddress);
        }

        public OrderHistoryForOrderSpecification() : base()
        {
            AddInclude(x => x.Order);
            AddInclude(x => x.OrderHistoryAddress);
        }
    }
}
