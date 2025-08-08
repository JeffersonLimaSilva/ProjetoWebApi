using System.ComponentModel.DataAnnotations;

namespace ProjetoWebApi.Features.Client.DTOs
{
    public class ClientDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string Address { get; set; }

        public string MoreInfor { get; set; }
        public string Interests { get; set; }
        public string Emotions { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
    }
}
