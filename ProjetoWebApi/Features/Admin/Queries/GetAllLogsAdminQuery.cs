using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class GetAllLogsAdminQuery : IQuery<List<AuditLogEntry>>
    {
        public Guid Id { get; set; }

        public GetAllLogsAdminQuery(Guid id)
        {
            Id = id;
        }
    }
}
