using ECommerce.Models.Identity;

namespace ECommerce.Services
{
    public interface IAccountService
    {
        Task<string> CreateToken(AppUser user);
        Task<string> GetRoleForUser(AppUser user);
    }
}
