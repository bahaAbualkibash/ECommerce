using ECommerce.Models.Order;
using ECommerce.Specifications;

namespace ECommerce.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail,int delivaryMethod, string basketId,Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<IReadOnlyList<Order>> GetOrdersForAllUserAsync(OrderSpecParams orderSpecParams);
        Task UpdateOrderStatus(Order order);
        public void CreateHistory(OrderHistory orderHistory);
        Task<int> GetOrdersCountAsync(OrderWithFiltersForCountSpec orderWithFiltersForCountSpec);
        Task<Order> GetOrderByIdAsync(int id,string buyerEmail = null);
        Task<IReadOnlyList<DelivaryMethod>> GetDelivaryMethodsAsync();
    }
}
