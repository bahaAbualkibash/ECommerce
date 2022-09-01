using ECommerce.Models;
using StackExchange.Redis;
using System.Text.Json;

namespace ECommerce.Repo
{
    public class BasketRepo : IBasketRepo
    {
        private readonly IDatabase database;
        public BasketRepo(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await this.database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string baketId)
        {
          var data = await  database.StringGetAsync(baketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
           var created = await database.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
            if (!created)
            {
                return null;
            }

            return await GetBasketAsync(basket.Id);
        }
    }
}
