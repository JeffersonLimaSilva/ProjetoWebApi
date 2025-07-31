using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Services;
using ProjetoWebApi.Features.Login.Commands;
using ProjetoWebApi.Model;
using System.Threading.Tasks;
using ProjetoWebApi.Features.Login.DTOs;

namespace ProjetoWebApi.Features.Login.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly IContextConnection _connection;
        private readonly Dispatcher _dispatcher;
        public string fileAdmin = "BaseRegister.txt";

        public LoginServices(IContextConnection connection, Dispatcher dispatcher)
        {
            _connection = connection;
            _dispatcher = dispatcher;
        }

        public async Task<object> ValidateAcess(LoginDto loginDto)
        {
            try
            {
                var credentials = new ValidateAcessCommand
                   (
                       loginDto.Email,
                       loginDto.Password
                   );
                await _dispatcher.Send(credentials);

                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Email == loginDto.Email);
                var token = TokenServices.GenerateToken(admin);

                return token;
            }
            catch (Exception ex) {

                throw new InvalidOperationException($"Erro ao validar Credenciais. {ex.Message}");
            }

        }
        
        
    }
}
