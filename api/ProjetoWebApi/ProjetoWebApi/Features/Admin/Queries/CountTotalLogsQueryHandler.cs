using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class CountTotalLogsQueryHandler : IQueryHandler<CountTotalLogsQuery, int>
    {
        private readonly IContextConnection _contextConnection;
        public string fileLogs = "BaseLogs.txt";

        public CountTotalLogsQueryHandler(IContextConnection contextConnection)
        {
            _contextConnection = contextConnection;
        }
        public async Task<int> Handler(CountTotalLogsQuery query, CancellationToken cancellationToken = default)
        {
            var allLogs = await _contextConnection.GetAll<AuditLogList>(fileLogs);
            var logsAdmin = allLogs.FirstOrDefault(l => l.Id == query.IdAdmin);
            return logsAdmin.AuditLogEntries.Count();
        }
    }
}
