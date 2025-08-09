using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Admin.Events;

namespace ProjetoWebApi.Common.AuditLog
{
    public class AuditLogEventHandler : IDomainEventHandler<CreateAdminEvent>, 
                                        IDomainEventHandler<CreateClientEvent>,
                                        IDomainEventHandler<DeleteClientEvent>,
                                        IDomainEventHandler<UpdateClientEvent>,
                                        IDomainEventHandler<LoginEvent>,
                                        IDomainEventHandler<LogoutEvent>


    {
        private readonly ILogger<AuditLogEventHandler> _logger;
        private readonly IContextConnection _connection;
        public string file = "BaseLogs.txt";

        public AuditLogEventHandler(ILogger<AuditLogEventHandler> logger, IContextConnection connection)
        {
            _logger = logger;
            _connection = connection;
        }

        public async Task Handler(CreateAdminEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Cadastrou-se."
            };

            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }
        public async Task Handler(CreateClientEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Adicionou {@event.ClientEmail}."
            };
            
            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }


        public async Task Handler(DeleteClientEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Deletou {@event.ClientEmail}."
            };

            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }

        public async Task Handler(UpdateClientEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Editou {@event.Update} de {@event.ClientEmail}."
            };

            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }

        public async Task Handler(LoginEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Logou-se."
            };

            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }

        public async Task Handler(LogoutEvent @event, CancellationToken cancellationToken = default)
        {
            var logEntry = new AuditLogEntry
            {
                AdminName = @event.AdminName,
                AdminEmail = @event.AdminEmail,
                Timestamp = @event.Timestamp,
                Action = $"Saiu."
            };

            var allAdminLogs = await _connection.GetAll<AuditLogList>(file);
            var adminLogs = allAdminLogs.FirstOrDefault(a => a.Id == @event.IdAdmin);
            adminLogs.AuditLogEntries.Add(logEntry);
            await _connection.SaveAll(allAdminLogs, file);
        }
    }
}
