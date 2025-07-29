using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class DeleteClientCommand : ICommand
    {
        public Guid IdAdmin { get; set; }
        public Guid IdClient { get; set; }

        public DeleteClientCommand(Guid idAdmin, Guid idClient)
        {
            IdAdmin = idAdmin;
            IdClient = idClient;
        }
    }
}
