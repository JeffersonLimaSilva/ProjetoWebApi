using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Client.DTOs;
using System.Data.Common;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetByIdQueryHandler : IQueryHandler<GetByIdQuery, Model.Client>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";

        public GetByIdQueryHandler(IContextConnection contextConnection)
        {
            _connection = contextConnection;
        }

        public async Task<Model.Client> Handler(GetByIdQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
            var admin =Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var client = admin.Clients.FirstOrDefault(c => c.Id == query.IdClient);

            return client;
        }
    }
}
