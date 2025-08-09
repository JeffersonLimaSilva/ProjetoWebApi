using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;

namespace ProjetoWebApi.Features.Admin.Commands
{
    public class CreateAdminCommandHandler : ICommandHandler<CreateAdminCommand>
    {
        private readonly IContextConnection _connection;
        private readonly IPublisher _publisher;
        public string fileAdmin = "BaseRegister.txt";
        public string fileLogs = "BaseLogs.txt";

        public CreateAdminCommandHandler(IContextConnection connection, IPublisher publisher)
        {
            _connection = connection;
            _publisher = publisher;
        }
        public async Task Handler(CreateAdminCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                List<Model.Admin> Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
                var admin = new Model.Admin
                (
                    command.Name,
                    command.Email,
                    command.Password
                );
                Admins.Add(admin);
                await _connection.SaveAll (Admins, fileAdmin);

                var allAdminLogs = await _connection.GetAll<AuditLogList>(fileLogs);
                allAdminLogs.Add(admin.CreateLogs());
                await _connection.SaveAll<AuditLogList>(allAdminLogs, fileLogs);

                var createAdmin = new CreateAdminEvent(admin);
                await _publisher.Publish(createAdmin, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }
        } 
    }
}
