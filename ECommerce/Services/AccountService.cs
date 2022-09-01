using ECommerce.Identity;
using ECommerce.Models;
using ECommerce.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.Services
{
    public class AccountService : IAccountService
    {
        private readonly TokenSettings tokenSettings;
        private readonly AppIdentityDbContext identityDbContext;
        private readonly UserManager<AppUser> userManager;
        private readonly SymmetricSecurityKey key;

        public AccountService(IOptions<TokenSettings> tokenSettings,AppIdentityDbContext identityDbContext
            , UserManager<AppUser> userManager)
        {
            this.tokenSettings = tokenSettings.Value;
            this.userManager = userManager;
            this.identityDbContext = identityDbContext;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.tokenSettings.SecretKey));

        }
        public async Task<string> CreateToken(AppUser user)
        {
            var role = await userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email), 
                new Claim(ClaimTypes.GivenName, user.DisplayName),
                new Claim(ClaimTypes.Role, role.LastOrDefault())
            };


            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials,
                Issuer = tokenSettings.Issuer
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }

        public async Task<string> GetRoleForUser(AppUser user)
        {
            var role = await userManager.GetRolesAsync(user);

            return role.LastOrDefault();
        }
    }
}
