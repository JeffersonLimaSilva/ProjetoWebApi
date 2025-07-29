using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Services;
using System.Security.Claims;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Auth(string email, string password)
        {
            if(email =="adm@gmail.com" && password == "adm123")
            {
                var token = TokenServices.GenerateToken(new Admin());
                return Ok(token);
            }
            return NotFound("Email ou Senha incorreta.");
        }
        [Authorize]
        [HttpGet]
        [Route("verify")]
        public IActionResult VerifyToken()
        {
            var Id = User.FindFirst("AdminId")?.Value;
            var Name = User.FindFirst("AdminName")?.Value;
            var Email = User.FindFirst("AdminEmail")?.Value;
            return Ok(new
                {
                UserId = Id,
                UserName = Name,
                UserEmail = Email,
            });
        }
    }
}
