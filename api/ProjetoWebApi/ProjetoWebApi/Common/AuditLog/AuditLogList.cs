namespace ProjetoWebApi.Common.AuditLog
{
    public class AuditLogList
    {
        public Guid Id { get; set; }
        public List<AuditLogEntry> AuditLogEntries { get; set; }
    }
}
