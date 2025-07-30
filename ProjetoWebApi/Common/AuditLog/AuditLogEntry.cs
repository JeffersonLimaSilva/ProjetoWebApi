namespace ProjetoWebApi.Common.AuditLog
{
    public class AuditLogEntry
    {
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public string Action { get; set; }
    }
}
