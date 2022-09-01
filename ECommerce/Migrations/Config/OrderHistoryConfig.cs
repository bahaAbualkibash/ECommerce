using ECommerce.Models.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerce.Migrations.Config
{
    public class OrderHistoryConfig : IEntityTypeConfiguration<OrderHistory>
    {
        public void Configure(EntityTypeBuilder<OrderHistory> builder)
        {
            builder.Property(s => s.Status).HasConversion(
                o => o.ToString(),
                o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o)
            );

        }
    }
}
