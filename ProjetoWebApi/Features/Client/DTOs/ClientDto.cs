using System.ComponentModel.DataAnnotations;

namespace ProjetoWebApi.Features.Client.DTOs
{
    public class ClientDto
    {
        [Required(ErrorMessage = "Campo Nome Obrigatório")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Campo Email Obrigatório")]
        [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Formato de Email inválido.")]
        public string Email { get; set; }

        public int Age { get; set; }
        public string Address { get; set; }
        public string MoreInfor { get; set; }
        public string Interests { get; set; }
        public string Emotions { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
    }
}
