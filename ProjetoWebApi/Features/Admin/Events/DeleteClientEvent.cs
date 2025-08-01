using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.Model;

namespace ProjetoWebApi.Features.Admin.Events
{
    public class DeleteClientEvent : IDomainEvent
    {
        public Guid IdAdmin { get; set; }
        public string AdminName { get; set; }
        public string AdminEmail { get; set; }
        public string ClientEmail { get; set; }
        public DateOnly Timestamp { get; set; }
        public DeleteClientEvent(DeleteClientCommand command, Model.Admin admin, Client.Model.Client client)
        {
            IdAdmin = command.IdAdmin;
            AdminName = admin.Name;
            AdminEmail = admin.Email;
            ClientEmail = client.Email;
            Timestamp = DateOnly.FromDateTime(DateTime.Today); ;
        }
    }
}
