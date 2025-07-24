using Microsoft.AspNetCore.Mvc;
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
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("{IdAdmin}/list")]
        public IActionResult List([FromRoute] Guid IdAdmin)
        {
            return Ok(_clientServices.ClientsList(IdAdmin).Result);
        }
    }
}
