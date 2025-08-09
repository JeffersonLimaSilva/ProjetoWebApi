using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Common.AuditLog
{
    public class AuditLogEntryDto
    {
        public List<AuditLogEntry> ListLogs { get; set; }
        public int TotalQueryLogs { get; set; }
    }
}
