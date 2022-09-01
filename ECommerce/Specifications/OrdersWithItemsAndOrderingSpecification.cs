using ECommerce.Helpers;
using ECommerce.Models.Order;
using System.Linq.Expressions;

namespace ECommerce.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(OrderSpecParams orderSpecParams) : base(x => orderSpecParams.IsDeliveredIncluded || x.Status != OrderStatus.Delivered)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DelivaryMethod);
            ApplyPaging(orderSpecParams.PageSize * (orderSpecParams.PageIndex - 1),orderSpecParams.PageSize);

            if(orderSpecParams.Sort != null)
            {
                switch (orderSpecParams.Sort)
                {
                    case (int)OrderSort.IdAsc:
                        AddOrderBy(x => x.Id);
                        break;
                    case (int)OrderSort.IdDesc:
                        AddOrderByDescending(x => x.Id);
                        break;
                    case (int)OrderSort.DateAsc:
                        AddOrderBy(x => x.OrderDate);
                        break;
                    case (int)OrderSort.DateDesc:
                        AddOrderByDescending(x => x.OrderDate);
                        break;
                    case (int)OrderSort.TotalPriceAsc:
                        AddOrderBy(x => (x.Subtotal + x.DelivaryMethod.Price));
                        break;
                    case (int)OrderSort.TotalPriceDesc:
                        AddOrderByDescending(x => x.Subtotal + x.DelivaryMethod.Price);
                        break;
                    default:
                        AddOrderBy(x => x.OrderDate);
                        break;
                }
            }
        }

        public OrdersWithItemsAndOrderingSpecification(string email): base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DelivaryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DelivaryMethod);
        }


    }
}
