using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Common.DTOs;
using ProjetoWebApi.Common.Exceptions;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.DTOs;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Features.Admin.Services;

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
        public async Task<IActionResult> Add([FromBody] AdminDto adminDto)
        {
            try
            {
                await _adminServices.NewAdmin(adminDto);
                return Ok();
            }
            catch (InvalidOperationException ex) {
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
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message, Status = 400 });
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
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
                return BadRequest(new { Message = ex.Message, Status = 400 });
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }
        }

        [HttpGet("{IdAdmin}/get-admin")]
        public IActionResult GetAdmin([FromRoute] Guid IdAdmin)
        {
            try
            {
                return Ok(_adminServices.GetById(IdAdmin).Result);
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

        [HttpPut("{IdAdmin}/update")]
        public IActionResult Update([FromRoute] Guid IdAdmin, [FromBody] AdminUpdateDto adminDto)
        {
            try
            {
                _adminServices.Update(IdAdmin, adminDto);
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

        [HttpGet("{IdAdmin}/search-list")]
        public IActionResult SearchLogsList([FromRoute] Guid IdAdmin, [FromQuery] string query, [FromQuery] PaginationDto paginationDto)
        {
            try
            {
                return Ok(_adminServices.SearchLogs(IdAdmin, query, paginationDto).Result);
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }
        }
    }
}
