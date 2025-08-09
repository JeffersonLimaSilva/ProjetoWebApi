namespace ProjetoWebApi.Features.Client.DTOs
{
    public class ClientShowDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public DateOnly Date { get; set; }
    }
}
