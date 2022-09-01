using System.Runtime.Serialization;

namespace ECommerce.Models.Order
{

    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Recevied")]
        PaymentRecevied,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed,
        [EnumMember(Value = "In Progress")]
        InProgress,
        [EnumMember(Value = "In Shipping")]
        InShipping,
        [EnumMember(Value = "Delivered")]
        Delivered,
        [EnumMember(Value = "Canceled")]
        Canceled,
    }
}
