using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class GetByIdQueryHandler : IQueryHandler<GetByIdQuery, Model.Admin>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";
        public GetByIdQueryHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public async Task<Model.Admin> Handler(GetByIdQuery query, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == query.IdAdmin);
            if (admin == null)
            {
                throw new ArgumentNullException("Registro inexistente");
            }
            return admin;
        }
    }
}
