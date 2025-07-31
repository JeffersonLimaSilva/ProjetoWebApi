using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class UpdateClientEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public string ClientEmail { get; set; }
        public string Update { get; set; }
        public DateOnly Timestamp { get; set; }
        public UpdateClientEvent(Guid idAdmin, string adminName, string adminEmail, string clientEmail, string update)
        {
            IdAdmin = idAdmin;
            AdminName = adminName;
            AdminEmail = adminEmail;
            ClientEmail = clientEmail;
            Update = update;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); ;
            
        }
    }
}
