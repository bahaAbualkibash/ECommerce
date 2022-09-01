using ECommerce.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByUserByClaimsPrincipleWithAddressAsync(this UserManager<AppUser> input,ClaimsPrincipal user)
        {
            
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
