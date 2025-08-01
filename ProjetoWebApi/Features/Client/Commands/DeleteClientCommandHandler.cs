using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class DeleteClientCommandHandler : ICommandHandler<DeleteClientCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";
        public string fileLogs = "BaseLogs.txt";


        public DeleteClientCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }

        public async Task Handler(DeleteClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id == command.IdClient);
                client.SoftDelete();
                await _connection.SaveAll(Admins, fileAdmin);

                var deleteClient = new DeleteClientEvent( command, admin, client);
                await _publisher.Publish(deleteClient, cancellationToken);
            }
            catch
            {
                throw new InvalidOperationException("Erro ao deletar o cliente");
            }
            
        }
    }
}
