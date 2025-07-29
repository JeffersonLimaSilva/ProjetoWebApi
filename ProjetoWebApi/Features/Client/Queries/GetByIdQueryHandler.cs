using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetByIdQueryHandler : IQueryHandler<GetByIdQuery, Model.Client>
    {
        private readonly IContextConnection _contextConnection;

        public GetByIdQueryHandler(IContextConnection contextConnection)
        {
            _contextConnection = contextConnection;
        }

        public async Task<Model.Client> Handler(GetByIdQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = _contextConnection.GetAll();
            var admin =Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var client = admin.Clients.FirstOrDefault(c => c.Id == query.IdClient);

            return client;
        }
    }
}
