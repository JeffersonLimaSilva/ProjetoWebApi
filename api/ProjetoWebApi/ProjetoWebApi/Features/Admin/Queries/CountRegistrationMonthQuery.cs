using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountRegistrationMonthQuery : IQuery<int>
    {
        public CountRegistrationMonthQuery(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }
        public Guid IdAdmin { get; set; }

    }
}
