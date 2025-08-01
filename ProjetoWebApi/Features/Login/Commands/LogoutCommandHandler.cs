using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;
using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Features.Login.Commands
{
    public class LogoutCommandHandler : ICommandHandler<LogoutCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";

        public LogoutCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }

        public async Task Handler(LogoutCommand command, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Id == command.IdAdmin);

            var logoutEvent = new LogoutEvent(admin);
            await _publisher.Publish(logoutEvent, cancellationToken);
        }
    }
}
