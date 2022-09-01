using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Models.Order;

namespace ECommerce.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private IConfiguration _config;

        public OrderItemUrlResolver(IConfiguration configuration)
        {
            _config = configuration; 
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _config["ApiUrl"] + source.ItemOrdered.PictureUrl;

            }

            return null;
        }
    }


}
