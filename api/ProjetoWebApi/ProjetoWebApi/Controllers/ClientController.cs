using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Common.DTOs;
using ProjetoWebApi.Common.Exceptions;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Services;

namespace ProjetoWebApi.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientServices _clientServices;

        public ClientController(IClientServices clientServices)
        {
            _clientServices = clientServices ?? throw new ArgumentNullException(nameof(clientServices));
        }

        [HttpPost("{IdAdmin}/add")]
        public async Task<IActionResult> Add([FromRoute] Guid IdAdmin, [FromBody] ClientDto clientDto)
        {
            
            try
            {
                await _clientServices.AddClient(IdAdmin, clientDto);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message, Status = 400 });
            }
            catch (ValidationException ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { Errors = ex.Errors, Status = 400 });
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }

        }

        [HttpGet("{IdAdmin}/list")]
        public IActionResult List([FromRoute] Guid IdAdmin, [FromQuery] PaginationDto paginationDto)
        {
            return Ok(_clientServices.ClientsList(IdAdmin, paginationDto).Result);
        }
        [Authorize]
        [HttpDelete("{id}/delete")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            try
            {
                var Id = Guid.Parse(User.FindFirst("AdminId")?.Value);
                _clientServices.DeleteClient(Id, id);
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

        [Authorize]
        [HttpPut("{id}/update")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] ClientDto clientDto)
        {
            try
            {
                var Id = Guid.Parse(User.FindFirst("AdminId")?.Value);
                await _clientServices.UpdateClient(Id, id, clientDto);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message, Status = 400 });
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

        [Authorize]
        [HttpGet("{id}/get-by-id")]
        public IActionResult ById([FromRoute] Guid id)
        {
            try
            {
                var Id = Guid.Parse(User.FindFirst("AdminId")?.Value);
                return Ok(_clientServices.GetById(Id, id).Result);
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
        public IActionResult SearchClientsList([FromRoute] Guid IdAdmin, [FromQuery] string query, [FromQuery] PaginationDto paginationDto)
        {
            try 
            { 
                return Ok(_clientServices.SearchClients(IdAdmin, query, paginationDto).Result);
            }
            catch (Exception ex)
            {
                return NotFound($"{ex.Message}");
            }
        }

        [HttpGet("{IdAdmin}/deleted-list")]
        public IActionResult DeletedList([FromRoute] Guid IdAdmin, [FromQuery] PaginationDto paginationDto)
        {
            return Ok(_clientServices.ClientsDeletedList(IdAdmin, paginationDto).Result);
        }
    }
}
