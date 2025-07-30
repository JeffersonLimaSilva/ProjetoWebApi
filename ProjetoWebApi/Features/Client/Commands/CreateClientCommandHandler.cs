using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.Events;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.Model;
using ProjetoWebApi.Model;

using System.Data.Common;

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
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);
                if(admin == null)
                {
                    throw new ArgumentNullException($"Admin com Id [{command.IdAdmin}] não existe.");
                }

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
                _connection.SaveAll<Admin.Model.Admin>(Admins, fileAdmin);

                var clientEvent = new CreateClientEvent
                (
                    command.IdAdmin,
                    admin.Name,
                    admin.Email,
                    command.Email
                );
                await _publisher.Publish( clientEvent , cancellationToken);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                
            }
        }
    }
}
