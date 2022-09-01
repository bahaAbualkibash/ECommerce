using ECommerce.Models.Order;

namespace ECommerce.Specifications
{
    public class OrderWithFiltersForCountSpec : BaseSpecification<Order>
    {
        public OrderWithFiltersForCountSpec(OrderSpecParams orderSpecParams) : base(x => orderSpecParams.IsDeliveredIncluded || x.Status != OrderStatus.Delivered)
        {
            //There is no Filters Currently
            //TODO: Add Filters
        }
    }
}
