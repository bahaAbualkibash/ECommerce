using ECommerce.Models.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerce.Migrations.Config
{
    public class DelivaryMethodConfig : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.Property(d => d.Price).HasColumnType("decimal(18,2)");
        }
    }
}
