using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class DeleteClientCommandHandler : ICommandHandler<DeleteClientCommand>
    {
        private readonly IContextConnection _connection;
        public string file = "BaseRegister.txt";
        public DeleteClientCommandHandler(IContextConnection contextConnection)
        {
            _connection = contextConnection ?? throw new ArgumentNullException(nameof(contextConnection));
        }

        public async Task Handler(DeleteClientCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(file);
                var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id == command.IdClient);
                client.SoftDelete();
                await _connection.SaveAll<Admin.Model.Admin>(Admins, file);
            }
            catch
            {
                throw new InvalidOperationException("Erro ao deletar o cliente");
            }
            
        }
    }
}
