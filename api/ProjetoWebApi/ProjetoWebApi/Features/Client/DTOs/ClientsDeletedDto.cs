namespace ProjetoWebApi.Features.Client.DTOs
{
    public class ClientsDeletedDto
    {
        public List<ClientShowDto> ListClients { get; set; }
        public int TotalQueryClients { get; set; }
    }
}
