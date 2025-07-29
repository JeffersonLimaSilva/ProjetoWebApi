using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class DeleteClientCommandHandler : ICommandHandler<DeleteClientCommand>
    {
        private readonly IContextConnection _contextConnection;

        public DeleteClientCommandHandler(IContextConnection contextConnection)
        {
            _contextConnection = contextConnection ?? throw new ArgumentNullException(nameof(contextConnection));
        }

        public Task Handler(DeleteClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = _contextConnection.GetAll();
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id == command.IdClient);
                client.SoftDelete();
                _contextConnection.SaveAll(Admins);
                return Task.CompletedTask;
            }
            catch
            {
                throw new InvalidOperationException("Erro ao deletar o cliente");
            }
            
        }
    }
}
