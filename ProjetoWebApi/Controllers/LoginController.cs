using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.DTOs;
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
        private readonly IAdminRepository _registerRepository;
        private readonly ILoginServices _loginServices;
        public LoginController( IAdminRepository registerRepository, ILoginServices loginServices)
        {
            _registerRepository = registerRepository ?? throw new ArgumentNullException(nameof(registerRepository));
            _loginServices = loginServices ?? throw new ArgumentNullException(nameof(loginServices));
        }
        
        [HttpPost]
        [Route("/login/check")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            try
            {
                return Ok(_loginServices.CheckLogin(loginDto));
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
                return Ok(_loginServices.CheckId(id));
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
            _loginServices.CheckEmail(loginDto);
            return Ok();
        }

    } 
}
