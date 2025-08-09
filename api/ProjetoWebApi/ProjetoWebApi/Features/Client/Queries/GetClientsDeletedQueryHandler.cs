using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Mapping;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetClientsDeletedQueryHandler : IQueryHandler<GetClientsDeletedQuery, ClientsDeletedDto>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public GetClientsDeletedQueryHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }
        public async Task<ClientsDeletedDto> Handler(GetClientsDeletedQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.Id);
            var clients = admin.Clients;
            clients.Reverse();
            var list = clients.Where(c => c.IsDelete).ToList();
            var clientsDeletedDto = new ClientsDeletedDto
            {
                ListClients = ClientsShowMapping.ToClientShow(list),
                TotalQueryClients = list.Count
            };
            return clientsDeletedDto;
        }
    }
}
