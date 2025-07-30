using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class GetAllLogsAdminQueryHandler : IQueryHandler<GetAllLogsAdminQuery, List<AuditLogEntry>>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseLogs.txt";
        public GetAllLogsAdminQueryHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }
        public async Task<List<AuditLogEntry>> Handler(GetAllLogsAdminQuery query, CancellationToken cancellationToken = default)
        {
            var allLogs = await _connection.GetAll<AuditLogList>(fileAdmin);
            var logsAdmin = allLogs.FirstOrDefault(l => l.Id == query.Id);

            var auditLogEntries = logsAdmin.AuditLogEntries;
            auditLogEntries.Reverse();
            

            return auditLogEntries;
        }
    }
}
