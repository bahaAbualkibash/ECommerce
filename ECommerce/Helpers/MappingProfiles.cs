using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Models;
using ECommerce.Models.Order;


namespace ECommerce.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
             .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Models.Identity.Address, AddressDto>().ReverseMap();

            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<ProductBrandDto, ProductBrand>();

            CreateMap<BasketItemDto, BasketItem>();

            CreateMap<ProductToAddDto, Product>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.ProductName))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.ProductDescription))
                .ForMember(d => d.Price, o => o.MapFrom(s => s.ProductPrice))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ProductPictureUrl));

            CreateMap<AddressDto, Models.Order.Address>();

            CreateMap<OrderItem, OrderItemDto>()
    .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
    .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
    .ForMember(d => d.PicturUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
    .ForMember(d => d.Quantity, o => o.MapFrom(s => s.Quantity))
    .ForMember(d => d.Price, o => o.MapFrom(s => s.Price))
            .ForMember(d => d.PicturUrl, o => o.MapFrom<OrderItemUrlResolver>());

            CreateMap<Order, OrderToReturnDto>()
                //.ForMember(d => d.OrderItems, o => o.Ignore())
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DelivaryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DelivaryMethod.Price));

            CreateMap<OrderToReturnDto, Order>()
                .ForMember(d => d.OrderItems, o => o.Ignore())
                .ForMember(d => d.DelivaryMethod, o => o.Ignore());

            CreateMap<OrderItemDto, OrderItem>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForPath(d => d.ItemOrdered.ProductName, o => o.MapFrom(s => s.ProductName))
                .ForPath(d => d.ItemOrdered.ProductItemId, o => o.MapFrom(s => s.ProductId))
                .ForPath(d => d.ItemOrdered.PictureUrl, o => o.MapFrom(s => s.PicturUrl));

            CreateMap<UpdateOrderStatusDto, Order>()
                .ForMember(d => d.Id, o => o.MapFrom(p => p.Id))
                .ForMember(d => d.OrderDate, o => o.Ignore())
                .ForMember(d => d.Status, o => o.MapFrom(p => Enum.Parse(typeof(OrderStatus),p.OrderStatus)));


            CreateMap<UpdateOrderStatusDto, OrderHistoryAddress>();
        }
    }
}
