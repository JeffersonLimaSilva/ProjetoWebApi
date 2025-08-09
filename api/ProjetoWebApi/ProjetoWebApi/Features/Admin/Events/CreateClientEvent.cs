using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.Commands;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class CreateClientEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public string ClientEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public CreateClientEvent(CreateClientCommand command, Model.Admin admin)
        {
            IdAdmin = command.IdAdmin;
            AdminName = admin.Name;
            AdminEmail = admin.Email;
            ClientEmail = command.Email;
            Timestamp = DateOnly.FromDateTime(DateTime.Today);
        }
    }
}
