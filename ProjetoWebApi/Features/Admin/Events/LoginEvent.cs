using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class LoginEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public LoginEvent(Model.Admin admin)
        {
            IdAdmin = admin.Id;
            AdminName = admin.Name;
            AdminEmail = admin.Email;
            Timestamp = DateOnly.FromDateTime(DateTime.Today);
        }
    }
}
