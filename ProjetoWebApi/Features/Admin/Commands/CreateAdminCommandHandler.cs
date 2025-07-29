using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Commands
{
    public class CreateAdminCommandHandler : ICommandHandler<CreateAdminCommand>
    {
        private readonly IContextConnection _connection;

        public CreateAdminCommandHandler(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(nameof(connection));
        }

        public Task Handler(CreateAdminCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                List<Model.Admin> Admins = _connection.GetAll();
                var admin = new Model.Admin
                (
                    command.Name,
                    command.Email,
                    command.Password
                );
                Admins.Add(admin);
                _connection.SaveAll(Admins);
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw;
            }
        } 
    }
}
