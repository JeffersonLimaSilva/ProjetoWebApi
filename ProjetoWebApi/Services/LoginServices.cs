using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Model;
using System.Threading.Tasks;

namespace ProjetoWebApi.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IContextConnection _connection;
        private readonly IAdminRepository _registerRepository;
        public string fileAdmin = "BaseRegister.txt";


        public LoginServices(ILoginRepository loginRepository, IContextConnection connection, IAdminRepository registerRepository)
        {
            _loginRepository = loginRepository ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
            _registerRepository = registerRepository ?? throw new ArgumentNullException();
        }
        
        public async Task<object> CheckLogin(LoginDto loginDto)
        {
            List<Admin> AdminsL = await _connection.GetAll<Admin>(fileAdmin);
            var admin = AdminsL.FirstOrDefault(l => l.Email == loginDto.Email);
            
            if (admin == null)
            {
                throw new InvalidOperationException("Email ou Senha incorreta.");
            }
            if (admin.Password != loginDto.Password)
            {
                throw new InvalidOperationException("Email ou Senha incorreta.");
            }
            return _loginRepository.Auth(admin);
        }
        public async Task<Admin> CheckId(Guid id)
        {
            var Admins = await _connection.GetAll<Admin>(fileAdmin);
            var admin = Admins.FirstOrDefault(r => r.Id == id);

            if (admin == null)
            {
                throw new InvalidOperationException($"Registro inválido.");
            }

            return(admin);
        }
        public async Task CheckEmail(LoginDto loginUpdate)
        {   
            List<Admin> AdminsL = await _connection.GetAll<Admin>(fileAdmin);
            var register = AdminsL.FirstOrDefault(r => r.Email == loginUpdate.Email);

            if (register == null)
            {
                throw new InvalidOperationException("Email incorreto.");
            }

            _registerRepository.Update(AdminsL, loginUpdate);
        }
    }
}
