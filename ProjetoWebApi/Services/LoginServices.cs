using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IContextConnection _connection;
        private readonly IAdminRepository _registerRepository;


        public LoginServices(ILoginRepository loginRepository, IContextConnection connection, IAdminRepository registerRepository)
        {
            _loginRepository = loginRepository ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
            _registerRepository = registerRepository ?? throw new ArgumentNullException();
        }
        
        public object CheckLogin(LoginDto loginDto)
        {
            List<Admin> AdminsL = _connection.GetAll();
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
        public Admin CheckId(Guid id)
        {
            
            var admin = _connection.GetAll().FirstOrDefault(r => r.Id == id);

            if (admin == null)
            {
                throw new InvalidOperationException($"Registro inválido.[{_connection.GetAll().ToList()}]");
            }

            return(admin);
        }
        public void CheckEmail(LoginDto loginUpdate)
        {   
            List<Admin> AdminsL = _connection.GetAll();
            var register = AdminsL.FirstOrDefault(r => r.Email == loginUpdate.Email);

            if (register == null)
            {
                throw new InvalidOperationException("Email incorreto.");
            }

            _registerRepository.Update(AdminsL, loginUpdate);
        }
    }
}
