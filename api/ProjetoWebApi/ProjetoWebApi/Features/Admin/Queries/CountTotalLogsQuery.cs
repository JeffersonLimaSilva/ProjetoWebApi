using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountTotalLogsQuery : IQuery<int>
    {
        public CountTotalLogsQuery(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }

        public Guid IdAdmin { get; set; }
    }
}
