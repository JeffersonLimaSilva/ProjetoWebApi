using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Common.Exceptions;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Features.Login.DTOs;
using ProjetoWebApi.Features.Login.Services;
using ProjetoWebApi.Services;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ILoginServices _loginServices;
        public AuthController(ILoginServices loginServices)
        {
            _loginServices = loginServices ?? throw new ArgumentNullException(nameof(loginServices));
        }

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
        [HttpPost]
        [Route("login/check")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var token = await _loginServices.ValidateAcess(loginDto);
                return Ok(token);
            }
            catch (UnauthorizedAccessException ex)
            {
                return BadRequest(new {Message = ex.Message, Status = 400});
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Errors = ex.Errors, Status = 400 });
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }
        }

        [HttpPost("{IdAdmin}/logout")]
        public async Task<IActionResult> Logout([FromRoute] Guid IdAdmin)
        {
            try
            {
                await _loginServices.LogoutSystem(IdAdmin);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message, Status = 400 });
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }
        }
    }
}
