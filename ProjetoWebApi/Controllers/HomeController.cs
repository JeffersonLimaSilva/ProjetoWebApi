using Microsoft.AspNetCore.Mvc;

namespace ProjetoWebApi.Controllers
{
    [Route("api/home/")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]

        public IActionResult VerifyToken()
        {
            return Ok();
        }
    }
}
