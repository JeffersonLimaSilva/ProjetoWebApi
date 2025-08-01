using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class LogoutEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public LogoutEvent(Model.Admin admin)
        {
            IdAdmin = admin.Id;
            AdminName = admin.Name;
            AdminEmail = admin.Email;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); ;
        }
    }
}
