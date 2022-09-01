using ECommerce.Models;

namespace ECommerce.Repo
{
    public interface IBasketRepo
    {
        Task<CustomerBasket> GetBasketAsync(string baketId);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
        Task<bool> DeleteBasketAsync(string basketId);
    }
}
