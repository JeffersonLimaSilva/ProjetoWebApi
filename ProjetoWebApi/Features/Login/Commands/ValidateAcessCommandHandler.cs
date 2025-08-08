using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;

namespace ProjetoWebApi.Features.Login.Commands
{
    public class ValidateAcessCommandHandler : ICommandHandler<ValidateAcessCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";

        public ValidateAcessCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }
        public async Task Handler(ValidateAcessCommand command, CancellationToken cancellationToken = default)
        {
            var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(a => a.Email == command.Email);

            if (admin == null || admin.Password != command.Password)
            {
                throw new UnauthorizedAccessException("Email ou Senha inválida.");
            }
            var loginEvent = new LoginEvent(admin);
            await _publisher.Publish(loginEvent, cancellationToken);
        }
    }
}
