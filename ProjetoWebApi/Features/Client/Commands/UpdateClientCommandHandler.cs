using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class UpdateClientCommandHandler : ICommandHandler<UpdateClientCommand>
    {
        private readonly IContextConnection _contextConnection;

        public UpdateClientCommandHandler(IContextConnection contextConnection)
        {
            _contextConnection = contextConnection;
        }

        public Task Handler(UpdateClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = _contextConnection.GetAll();
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

                _contextConnection.SaveAll(Admins);
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Erro ao editar Client");
            }
        }
    }
}
