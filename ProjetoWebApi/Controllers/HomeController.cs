using Microsoft.AspNetCore.Mvc;

namespace ProjetoWebApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
