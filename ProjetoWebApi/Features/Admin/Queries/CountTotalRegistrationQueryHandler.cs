using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountTotalRegistrationQueryHandler : IQueryHandler<CountTotalRegistrationQuery, int>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public CountTotalRegistrationQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public async Task<int> Handler(CountTotalRegistrationQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            var clients = admin.Clients.Where(c => !c.IsDelete);
            int count = clients.Count();

            return count;
        }
    }
}
