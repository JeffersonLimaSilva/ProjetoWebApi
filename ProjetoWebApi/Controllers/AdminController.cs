using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.DTOs;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Features.Admin.Services;
using ProjetoWebApi.Infrastructure;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;
using System.Threading.Tasks;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminServices _adminServices;
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";


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
        public async Task<IActionResult> List()
        {
            var Admins = await _connection.GetAll<Admin>(fileAdmin);
            return Ok(Admins.ToList());
        }
        
        [HttpGet("{IdAdmin}/list-logs")]
        public IActionResult List([FromRoute] Guid IdAdmin, [FromQuery] PaginationDto paginationDto)
        {
            return Ok(_adminServices.GetAllLogsAdmin(IdAdmin, paginationDto).Result);
        }

        [HttpGet("{IdAdmin}/total-logs")]
        public IActionResult TotalRegistration([FromRoute] Guid IdAdmin)
        {
            try
            {
                return Ok(_adminServices.CountTotalLogs(IdAdmin).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
