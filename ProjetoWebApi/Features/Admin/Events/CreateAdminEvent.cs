using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class CreateAdminEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public CreateAdminEvent(Guid idAdmin, string adminName, string adminEmail)
        {
            IdAdmin = idAdmin;
            AdminName = adminName;
            AdminEmail = adminEmail;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); ;
        }

    }
}
