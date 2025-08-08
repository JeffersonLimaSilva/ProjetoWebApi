using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Mapping;

namespace ProjetoWebApi.Features.Admin.Queries
{
    public class SearchLogsQueryHandler : IQueryHandler<SearchLogsQuery, AuditLogEntryDto>
    {
        
        private readonly IContextConnection _connection;
        public string fileLogs = "BaseLogs.txt";
        public SearchLogsQueryHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }
        public async Task<AuditLogEntryDto> Handler(SearchLogsQuery query, CancellationToken cancellationToken = default)
        {
            try
            {
                var allLogs = await _connection.GetAll<AuditLogList>(fileLogs);
                var logsAdmin = allLogs.FirstOrDefault(l => l.Id == query.IdAdmin);

                var auditLogSearch = logsAdmin.AuditLogEntries.Where(l => l.AdminEmail.Contains(query.SearchLogs, StringComparison.OrdinalIgnoreCase) ||
                                                                        l.AdminName.Contains(query.SearchLogs, StringComparison.OrdinalIgnoreCase) ||
                                                                        l.Action.Contains(query.SearchLogs, StringComparison.OrdinalIgnoreCase)).ToList();
                auditLogSearch.Reverse();
                var auditLogEntryDto = new AuditLogEntryDto
                {
                    ListLogs = auditLogSearch,
                    TotalQueryLogs = auditLogSearch.Count
                };
                return auditLogEntryDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
