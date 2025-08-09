using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Mapping;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class SearchClientsQueryHandler : IQueryHandler<SearchClientsQuery, ClientsSearchDto>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public SearchClientsQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public async Task<ClientsSearchDto> Handler(SearchClientsQuery query, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
                if (admin == null)
                {
                    throw new ArgumentNullException($"Admin com Id [{query.IdAdmin}] não existe.");
                }
                var clients = admin.Clients.Where(c => !c.IsDelete);
                var queryClients = clients.Where(c => 
                                                 c.Name.Contains(query.SearchClients, StringComparison.OrdinalIgnoreCase) || 
                                                 c.Email.Contains(query.SearchClients, StringComparison.OrdinalIgnoreCase) || 
                                                 c.Status.Contains(query.SearchClients, StringComparison.OrdinalIgnoreCase)
                                                ).ToList();
                queryClients.Reverse();
                var clientsSearchDto = new ClientsSearchDto { 
                        ListClients = ClientsShowMapping.ToClientShow(queryClients),
                        TotalQueryClients = queryClients.Count 
                };
                return clientsSearchDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
