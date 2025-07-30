using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;
using System.Data.Common;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class UpdateClientCommandHandler : ICommandHandler<UpdateClientCommand>
    {
        private readonly IContextConnection _connection;
        public string file = "BaseRegister.txt";

        public UpdateClientCommandHandler(IContextConnection contextConnection)
        {
            _connection = contextConnection;
        }

        public async Task Handler(UpdateClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(file);
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

                await _connection.SaveAll<Admin.Model.Admin>(Admins, file);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Erro ao editar Client");
            }
        }
    }
}
