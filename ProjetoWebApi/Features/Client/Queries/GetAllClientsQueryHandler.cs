using Newtonsoft.Json;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Model;
using System.IO;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetAllClientsQueryHandler : IQueryHandler<GetAllClientsQuery, List<Model.Client>>
    {
        private readonly IContextConnection _connection;

        public GetAllClientsQueryHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }

        public async Task<List<Model.Client>> Handler(GetAllClientsQuery query, CancellationToken cancellationToken = default)
        {
            var admin = _connection.GetAll().FirstOrDefault(a => a.Id == query.Id);
            List<Model.Client> list = admin.Clients;
            
            
            return list;
        }
    }
}
