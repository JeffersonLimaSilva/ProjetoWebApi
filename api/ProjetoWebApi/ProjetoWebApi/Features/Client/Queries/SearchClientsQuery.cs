using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class SearchClientsQuery : IQuery<ClientsSearchDto>
    {
        public SearchClientsQuery(Guid idAdmin, string searchClients)
        {
            IdAdmin = idAdmin;
            SearchClients = searchClients;
        }

        public Guid IdAdmin { get; set; }
        public string SearchClients { get; set; }
    }
}
