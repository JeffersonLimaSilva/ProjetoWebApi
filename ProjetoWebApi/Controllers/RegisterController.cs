using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Infrastructure;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("/register")]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterServices _registerServices;
        private readonly IContextConnection _connection;

        public RegisterController( IRegisterServices registerServices, IContextConnection connection)
        {
            _registerServices = registerServices ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
        }

        [HttpPost]
        [Route("/register/add")]
        public IActionResult Add([FromForm] RegisterDto registerDto)
        {
            try
            {
                _registerServices.NewRegister(registerDto);
                return RedirectToAction(nameof(List));
            }
            catch (InvalidOperationException ex) {
                return NotFound($"{ex.Message}");
            }
            
        }
        [HttpGet]
        [Route("/register/list")]
        public IActionResult List()
        {
            return Ok(_connection.GetAll().ToList());
        }
        [HttpDelete]
        [Route("/register/delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _registerServices.CheckRegister(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound($"{ex.Message}");
            }
        }
    }
}
