namespace ECommerce.Models.Order
{
    public class OrderHistoryAddress: BaseEntity
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
