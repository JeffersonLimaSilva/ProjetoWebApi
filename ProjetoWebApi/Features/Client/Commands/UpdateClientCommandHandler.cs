using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Admin.Events;
using ProjetoWebApi.Model;
using System.Data.Common;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class UpdateClientCommandHandler : ICommandHandler<UpdateClientCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";
        public string fileLogs = "BaseLogs.txt";

        public UpdateClientCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }

        public async Task Handler(UpdateClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id == command.Id);
                client.Name = command.Name;
                client.Email = command.Email;
                client.Age = command.Age;
                client.Address = command.Address;
                client.MoreInfor = command.MoreInfor;
                client.Interests = command.Interests;
                client.Emotions = command.Emotions;
                client.Value = command.Value;
                client.Status = command.Status;

                await _connection.SaveAll(Admins, fileAdmin);

                var updateClient = new UpdateClientEvent
                (
                    command.IdAdmin,
                    admin.Name,
                    admin.Email,
                    client.Email,
                    command.Update
                );
                await _publisher.Publish(updateClient, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Erro ao editar Client");
            }
        }
    }
}
