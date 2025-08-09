namespace ProjetoWebApi.Features.Client.DTOs
{
    public class ClientsSearchDto
    {
        public List<ClientShowDto> ListClients { get; set; }
        public int TotalQueryClients { get; set; }
    }
}
