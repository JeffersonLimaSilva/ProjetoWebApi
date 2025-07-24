using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Infrastructure;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminServices _adminServices;
        private readonly IContextConnection _connection;


        public AdminController( IAdminServices adminServices, IContextConnection connection)
        {
            _adminServices = adminServices ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
        }

        [HttpPost]
        [Route("add/")]
        public IActionResult Add([FromBody] AdminDto adminDto)
        {
            try
            {
                _adminServices.NewAdmin(adminDto);
                return RedirectToAction(nameof(List));
            }
            catch (InvalidOperationException ex) {
                return NotFound($"{ex.Message}");
            }
            
        }
        [HttpGet]
        [Route("list/")]
        public IActionResult List()
        {
            return Ok(_connection.GetAll().ToList());
        }
        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _adminServices.CheckAdmin(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound($"{ex.Message}");
            }
        }
    }
}
