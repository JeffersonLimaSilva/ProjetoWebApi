using System.ComponentModel.DataAnnotations;

namespace ProjetoWebApi.Features.Login.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Campo Email Obrigatório")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Formato de Email inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Campo Senha Obrigatório")]
        public string Password { get; set; }    

    }
}
