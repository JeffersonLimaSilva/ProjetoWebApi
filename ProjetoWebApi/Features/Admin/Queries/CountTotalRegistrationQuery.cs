using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountTotalRegistrationQuery : IQuery<int>
    {
        public CountTotalRegistrationQuery(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }
        public Guid IdAdmin { get; set; }
    }
}
