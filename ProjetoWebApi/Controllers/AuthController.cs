using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Services;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Auth(string email, string password)
        {
            if(email =="adm@gmail.com" && password == "adm123")
            {
                var token = TokenServices.GenerateToken(new Model.Register());
                return Ok(token);
            }
            return NotFound("Email ou Senha incorreta.");
        }
    }
}
