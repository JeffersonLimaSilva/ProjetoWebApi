using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.Model;
using ProjetoWebApi.Model;

using System.Data.Common;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class CreateClientCommandHandler : ICommandHandler<CreateClientCommand>
    {
        private readonly IContextConnection _connection;

        public CreateClientCommandHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }

        public Task Handler(CreateClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = _connection.GetAll();
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
                _connection.SaveAll(Admins);
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Task.CompletedTask;
            }
        }
    }
}
