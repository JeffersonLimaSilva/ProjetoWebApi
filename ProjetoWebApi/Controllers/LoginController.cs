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
    [Route("/login")]
    public class LoginController : ControllerBase
    {
        private readonly IRegisterRepository _registerRepository;
        private readonly ILoginServices _loginServices;
        public LoginController( IRegisterRepository registerRepository, ILoginServices loginServices)
        {
            _registerRepository = registerRepository ?? throw new ArgumentNullException();
            _loginServices = loginServices ?? throw new ArgumentNullException();
        }
        
        [HttpPost]

        public IActionResult Login([FromForm]LoginDto loginDto)
        {
            try
            {
                _loginServices.CheckLogin(loginDto);
                return Ok();
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
            return Ok(_loginServices.CheckId(id));
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
