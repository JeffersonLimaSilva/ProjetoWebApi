using System.ComponentModel.DataAnnotations;

namespace ProjetoWebApi.Features.Admin.DTOs
{
    public class AdminDto
    {
        [Required(ErrorMessage = "Campo Nome Obrigatório")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Campo Email Obrigatório")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Formato de Email inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Campo Senha Obrigatório")]
        public string Password { get; set; }
    }
}
