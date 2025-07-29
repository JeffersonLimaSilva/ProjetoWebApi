using Microsoft.AspNetCore.Mvc;
using ProjetoWebApi.Features.Admin.Services;

namespace ProjetoWebApi.Controllers
{   
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IAdminServices _adminServices;

        public DashboardController(IAdminServices adminServices)
        {
            _adminServices = adminServices ?? throw new ArgumentNullException(nameof(adminServices));
        }

        [HttpGet("{IdAdmin}/total-registration")]
        public IActionResult TotalRegistration([FromRoute] Guid IdAdmin)
        {
            try
            {
                return Ok(_adminServices.CountTotalRegistration(IdAdmin).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{IdAdmin}/registration-month")]
        public IActionResult RegistrationMonth([FromRoute] Guid IdAdmin)
        {
            try
            {
                return Ok(_adminServices.CountRegistrationMonth(IdAdmin).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{IdAdmin}/registration-inactive")]
        public IActionResult RegistrationInactive([FromRoute] Guid IdAdmin)
        {
            try
            {
                return Ok(_adminServices.CountRegistrationInactive(IdAdmin).Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
