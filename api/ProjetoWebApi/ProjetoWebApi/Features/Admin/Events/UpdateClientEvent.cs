using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.Commands;

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
        public UpdateClientEvent(UpdateClientCommand command, Model.Admin admin)
        {
            IdAdmin = command.IdAdmin;
            AdminName = admin.Name;
            AdminEmail = admin.Email;
            ClientEmail = command.Email;
            Update = command.Update;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); 
        }
    }
}
