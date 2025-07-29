using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationMonthQueryHandler : IQueryHandler<CountRegistrationMonthQuery, int>
    {
        private readonly IContextConnection _connection;

        public CountRegistrationMonthQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public Task<int> Handler(CountRegistrationMonthQuery query, CancellationToken cancellationToken = default)
        {
            var date = DateTime.Now;
            var Admins = _connection.GetAll();
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete && c.Date.Month == date.Month);
            int count = clients.Count();

            return Task.FromResult(count);
        }
    }
}
