using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Admin.Commands
{
    public class UpdateAdminCommandHandler : ICommandHandler<UpdateAdminCommand>
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";

        public UpdateAdminCommandHandler(IContextConnection connection)
        {
            _connection = connection;
        }

        public async Task Handler(UpdateAdminCommand command, CancellationToken cancellationToken = default)
        {
            try
            {
                var Admins = await _connection.GetAll<Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == command.Id);
                if (admin == null)
                {
                    throw new ArgumentNullException($"Admin com Id [{command.Id}] não existe.");
                }
                admin.Name = command.Name;
                admin.Email = command.Email;
                admin.Password = command.Password;
                admin.Theme = command.Theme;
                await _connection.SaveAll(Admins, fileAdmin);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao editar registro. {ex.Message}");
            }
        }
    }
}
