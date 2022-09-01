using AutoMapper;
using ECommerce.DTOs;
using ECommerce.Errors;
using ECommerce.Extensions;
using ECommerce.Helpers;
using ECommerce.Models.Identity;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IAccountService accountService;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, 
            IAccountService accountService,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.accountService = accountService;
            this.mapper = mapper;
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var email = User.FindFirst(ClaimTypes.Email).Value;

            var user = await userManager.FindByEmailAsync(email);

            return new UserDto
            {
                Email = user.Email,
                Token = await accountService.CreateToken(user),
                Username = user.DisplayName,
                Role = await accountService.GetRoleForUser(user)
            };
        }

        

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
         
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {

            var user = await userManager.FindByUserByClaimsPrincipleWithAddressAsync(User);

            return mapper.Map<Address, AddressDto>(user.Address);

        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto)
        {
            var user = await userManager.FindByUserByClaimsPrincipleWithAddressAsync(User);

            user.Address = mapper.Map<AddressDto,Address>(addressDto);

            var result = await userManager.UpdateAsync(user);
             
            if (result.Succeeded) return Ok(mapper.Map<Address, AddressDto>(user.Address));
             
            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
           var user = await userManager.FindByEmailAsync(loginDto.Email);
            if(user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }
           var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new ApiResponse(401));
            }

            return new UserDto
            {
                Email = user.Email,
                Username = user.DisplayName,
                Role = await accountService.GetRoleForUser(user),
                Token = await accountService.CreateToken(user)
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{ Errors = new[] {"Email address is in use"}});
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);
            
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            result = await userManager.AddToRoleAsync(user, RoleTypes.DefualtRole);
            if (!result.Succeeded)
            {

                await userManager.RemovePasswordAsync(user);
                await userManager.DeleteAsync(user);
                return StatusCode(500, "Error while creating your account, Contact Us.");
            }
            return new UserDto
            {
                Email = user.Email,
                Username = user.DisplayName,
                Role = await accountService.GetRoleForUser(user),
                Token = await accountService.CreateToken(user)
            };
        }


    }
}
