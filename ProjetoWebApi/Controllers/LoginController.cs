using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Features.Login.DTOs;
using ProjetoWebApi.Features.Login.Services;
using ProjetoWebApi.Infrastructure;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;
using System.Collections.Generic;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginServices _loginServices;
        public LoginController(ILoginServices loginServices)
        {
            _loginServices = loginServices ?? throw new ArgumentNullException(nameof(loginServices));
        }
        
        [HttpPost]
        [Route("/login/check")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var token = await _loginServices.ValidateAcess(loginDto);
                return Ok(token);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound($"{ex.Message}");
            }
        }

        [HttpGet]
        [Route("/login/get-update")]
        public IActionResult Update(Guid id)
        {
            try
            {
                return Ok();
            }
            catch(Exception ex)
            {
                return NotFound($"Ex: {ex.Message}");
            }
        }
        [Authorize]
        [HttpPut]
        [Route("/login/update")]
        public IActionResult Update([FromForm] LoginDto loginDto)
        {
            return Ok();
        }

    } 
}
