using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountTotalRegistrationQueryHandler : IQueryHandler<CountTotalRegistrationQuery, int>
    {
        private readonly IContextConnection _connection;

        public CountTotalRegistrationQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public Task<int> Handler(CountTotalRegistrationQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = _connection.GetAll();
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete);
            int count = clients.Count();

            return Task.FromResult(count);
        }
    }
}
