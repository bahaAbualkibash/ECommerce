using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }

    }
}
