using ECommerce.Models;
using ECommerce.Models.Order;
using ECommerce.Repo;
using ECommerce.Specifications;

namespace ECommerce.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepo basketRepo;
        private readonly IUnitOfWork unitOfWork;

        public OrderService(IBasketRepo basketRepo,IUnitOfWork unitOfWork)
        {
            this.basketRepo = basketRepo;
            this.unitOfWork = unitOfWork;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int delivaryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the basket repo
            var basket =  await basketRepo.GetBasketAsync(basketId);
            // get items from the product repo
            var listItems = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await unitOfWork.Repo<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                listItems.Add(orderItem);
            }
            // get delivary method
            var delivaryMethod = await unitOfWork.Repo<DelivaryMethod>().GetByIdAsync(delivaryMethodId);
            // calculate subtotal
            var subtotal = listItems.Sum(item => item.Price * item.Quantity);
            // create order
            var order = new Order(shippingAddress,delivaryMethod,listItems,buyerEmail,subtotal);
            //TODO: save to db
            unitOfWork.Repo<Order>().Add(order);
            var result = await unitOfWork.Complete();

            if(result <= 0)
            {
                return null;
            }

            //delete basket after order
            await basketRepo.DeleteBasketAsync(basketId);

            // return order
            return order;

        }

        public async Task<IReadOnlyList<DelivaryMethod>> GetDelivaryMethodsAsync()
        {
            return await unitOfWork.Repo<DelivaryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync( int id,string buyerEmail = null)
        {
            if (!string.IsNullOrEmpty(buyerEmail))
            {
                var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

                return await unitOfWork.Repo<Order>().GetEntityWithSpec(spec);
            }else
            {
                return await unitOfWork.Repo<Order>().GetByIdAsync(id);
            }
        }



        public async Task<IReadOnlyList<Order>> GetOrdersForAllUserAsync(OrderSpecParams orderSpecParams)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(orderSpecParams);

            return await unitOfWork.Repo<Order>().ListAsync(spec);
        }

        public async Task<int> GetOrdersCountAsync(OrderWithFiltersForCountSpec orderWithFiltersForCountSpec) 
        {
            return await  unitOfWork.Repo<Order>().CountAsync(orderWithFiltersForCountSpec);
        }

        private bool IsAnyProperetyNull(object o)
        {
            foreach (var proparety in o.GetType().GetProperties())
            {
                if (proparety == null)
                {
                    return true;
                };
            }
            return false;
        }
        public  void CreateHistory(OrderHistory orderHistory)
        {
            var result = IsAnyProperetyNull(orderHistory.OrderHistoryAddress);
            
            if (result)
            {

            }

            unitOfWork.Repo<OrderHistory>().Add(orderHistory);
        }

        public async Task UpdateOrderStatus(Order order)
        {
             unitOfWork.Repo<Order>().Update(order);
            var result = await unitOfWork.Complete();
            

        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await unitOfWork.Repo<Order>().ListAsync(spec);
        }
    }
}
