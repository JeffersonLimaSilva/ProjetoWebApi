using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationInactiveQueryHandler : IQueryHandler<CountRegistrationInactiveQuery, int>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";

        public CountRegistrationInactiveQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }
        public async Task<int> Handler(CountRegistrationInactiveQuery query, CancellationToken cancellationToken = default)
        { 
            var Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete && c.Status == "Inativo");
            int count = clients.Count();

            return count;
        }
    }
}
