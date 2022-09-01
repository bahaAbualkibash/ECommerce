using ECommerce.Models;
using ECommerce.Models.Order;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ECommerce.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }


        
        public DbSet<Product> Products{ get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderHistory> OrdersHistory { get; set; }
        public DbSet<OrderHistoryAddress> OrderHistoryAddress { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DelivaryMethod> DelivaryMethods { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine, LogLevel.Trace);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
