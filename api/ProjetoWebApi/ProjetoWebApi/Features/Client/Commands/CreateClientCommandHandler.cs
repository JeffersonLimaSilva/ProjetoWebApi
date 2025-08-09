using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;


namespace ProjetoWebApi.Features.Client.Commands
{
    public class CreateClientCommandHandler : ICommandHandler<CreateClientCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";
        public string fileLogs = "BaseLogs.txt";
        public CreateClientCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }
        public async Task Handler(CreateClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin) ?? throw new ArgumentNullException($"Admin com Id [{command.IdAdmin}] não existe.");
                var client = new Model.Client(
                    command.Name,
                    command.Email,
                    command.Age,
                    command.Address,
                    command.MoreInfor,
                    command.Interests,
                    command.Emotions,
                    command.Value,
                    command.Status);
                admin.AddClient(client);
                await _connection.SaveAll(Admins, fileAdmin);

                var clientEvent = new CreateClientEvent(command, admin);
                await _publisher.Publish( clientEvent , cancellationToken);

            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao criar Cliente");
            }
        }
    }
}
