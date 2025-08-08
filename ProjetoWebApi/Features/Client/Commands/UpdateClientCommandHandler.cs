using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;

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
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin) ?? throw new ArgumentNullException($"Admin com Id [{command.IdAdmin}] não existe.");
                var client = admin.Clients.FirstOrDefault(c => c.Id == command.Id) ?? throw new ArgumentNullException($"Cliente com Id [{command.Id}] não existe.");
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

                var updateClient = new UpdateClientEvent(command, admin);
                await _publisher.Publish(updateClient, cancellationToken);
            }
            catch (ArgumentNullException)
            {
                throw;
            }
            catch
            {
                throw new InvalidOperationException("Erro ao editar Cliente");
            }
        }
    }
}
