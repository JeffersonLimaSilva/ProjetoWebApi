using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Login.Commands
{
    public class LogoutCommand : ICommand
    {
        public Guid IdAdmin { get; set; }
        public LogoutCommand(Guid idAdmin)
        {
            IdAdmin = idAdmin;
        }
    }
}
