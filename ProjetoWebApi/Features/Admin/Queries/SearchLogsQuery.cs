using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class SearchLogsQuery : IQuery<AuditLogEntryDto>
    {
        public SearchLogsQuery(Guid idAdmin, string searchLogs)
        {
            IdAdmin = idAdmin;
            SearchLogs = searchLogs;
        }

        public Guid IdAdmin { get; set; }
        public string SearchLogs { get; set; }
    }
}
