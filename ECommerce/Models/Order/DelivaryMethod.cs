namespace ECommerce.Models.Order
{
    public class DelivaryMethod : BaseEntity
    {
        public string ShortName { get; set; }
        public string? DelivaryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
