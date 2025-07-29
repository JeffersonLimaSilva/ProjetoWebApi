using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Services;
using System.Security.Claims;

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
        public IActionResult Add([FromRoute] Guid IdAdmin, [FromBody] ClientDto clientDto)
        {
            Console.WriteLine("Entrou aq");
            try
            {
                _clientServices.AddClient(IdAdmin, clientDto);
                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Ola");
                return NotFound(ex);
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
            catch(Exception ex)
            {
                return NotFound($"Erro: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("{id}/update")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] ClientDto clientDto)
        {
            try
            {
                var Id = Guid.Parse(User.FindFirst("AdminId")?.Value);
                _clientServices.UpdateClient(Id, id, clientDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound($"Erro: {ex.Message}");
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
            catch (Exception ex)
            {
                return NotFound($"Erro: {ex.Message}");
            }
        }
    }
}
