using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetAllClientsQueryHandler : IQueryHandler<GetAllClientsQuery, List<Model.Client>>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public GetAllClientsQueryHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }
        public async Task<List<Model.Client>> Handler(GetAllClientsQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.Id);
            var clients = admin.Clients;
            clients.Reverse();
            var list = clients.Where(c => !c.IsDelete).ToList();

            return list;
        }
    }
}
