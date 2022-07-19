using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Models;

namespace ECommerce.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
               return "https://localhost:7070/" + source.PictureUrl;
            return null;
        }
    }
}
