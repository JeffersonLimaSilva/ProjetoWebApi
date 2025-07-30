using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Features.Admin.Model
{
    public class Admin : Person
    {
        
        public string Password { get; set; }
        public bool Theme { get; set; } = false;
        public List<Client.Model.Client> Clients { get; set; } = new List<Client.Model.Client>();
        
        public Admin( string name, string email, string password)
            :base(name, email)
        {
            Password = password;
        }

        public Admin() { }

        public void AddClient(Client.Model.Client client)
        {
            Clients.Add(client);
        }
        public AuditLogList CreateLogs() 
        {
            var logsAdmin = new AuditLogList
            {
                Id = base.Id,
                AuditLogEntries = new List<AuditLogEntry>()
            }; 
            return logsAdmin;
        }

    }
}
