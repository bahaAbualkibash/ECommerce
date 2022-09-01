using ECommerce.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("errors/{code}")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
