using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationMonthQueryHandler : IQueryHandler<CountRegistrationMonthQuery, int>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public CountRegistrationMonthQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public async Task<int> Handler(CountRegistrationMonthQuery query, CancellationToken cancellationToken = default)
        {
            var date = DateTime.Now;
            var Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete && c.Date.Month == date.Month);
            int count = clients.Count();

            return count;
        }
    }
}
