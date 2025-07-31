using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class DeleteClientEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public string ClientEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public DeleteClientEvent(Guid idAdmin, string adminName, string adminEmail, string clientEmail)
        {
            IdAdmin = idAdmin;
            AdminName = adminName;
            AdminEmail = adminEmail;
            ClientEmail = clientEmail;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); ;
        }
    }
}
