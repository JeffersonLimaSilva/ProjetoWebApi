using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Common.Exceptions;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Login.Commands;
using ProjetoWebApi.Features.Login.DTOs;
using ProjetoWebApi.Features.Login.Validation;
using ProjetoWebApi.Services;

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
                List<string> errors = [];
                LoginValidation.EmailValidation(errors, loginDto.Email);
                LoginValidation.PasswordValidation(errors, loginDto.Password);
                if (errors.Any())
                {
                    Console.WriteLine("oi");
                    throw new ValidationException(errors);
                }
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
            catch {

                throw;
            }
        }
        public async Task LogoutSystem(Guid IdAdimn)
        {
            try
            {
                var Logout = new LogoutCommand(IdAdimn);
                await _dispatcher.Send(Logout);
            }
            catch (Exception ex) {
                throw new InvalidOperationException("Erro ao deslogar do sistema");
            }
        }
    }
}
