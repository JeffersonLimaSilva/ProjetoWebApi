using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationInactiveQueryHandler : IQueryHandler<CountRegistrationInactiveQuery, int>
    {
        private readonly IContextConnection _connection;

        public CountRegistrationInactiveQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public Task<int> Handler(CountRegistrationInactiveQuery query, CancellationToken cancellationToken = default)
        { 
            var Admins = _connection.GetAll();
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete && c.Status == "Inativo");
            int count = clients.Count();

            return Task.FromResult(count);
        }
    }
}
