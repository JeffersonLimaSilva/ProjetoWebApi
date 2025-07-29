using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationInactiveQuery : IQuery<int>
    {
        public CountRegistrationInactiveQuery(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }

        public Guid IdAdmin { get; set; }

    }
}
