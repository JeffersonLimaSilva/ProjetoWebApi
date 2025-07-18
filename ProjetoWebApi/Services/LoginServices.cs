using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Services
{
    public class LoginServices : ILoginServices
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IContextConnection _connection;
        private readonly IRegisterRepository _registerRepository;

        public LoginServices(ILoginRepository loginRepository, IContextConnection connection, IRegisterRepository registerRepository)
        {
            _loginRepository = loginRepository ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
            _registerRepository = registerRepository ?? throw new ArgumentNullException();
        }
        
        public void CheckLogin(LoginDto loginDto)
        {
            List<Register> registersL = _connection.GetAll();
            var register = registersL.FirstOrDefault(l => l.Email == loginDto.Email);
            
            if (register == null)
            {
                throw new InvalidOperationException("Email ou Senha incorreta.");
            }
            if (register.Password != loginDto.Password)
            {
                throw new InvalidOperationException("Email ou Senha incorreta.");
            }
            _loginRepository.Auth(register);
        }
        public Register CheckId(Guid id)
        {
            List<Register> registersL = _connection.GetAll();
            var register = registersL.FirstOrDefault(r => r.Id == id);

            if (register == null)
            {
                throw new InvalidOperationException("Registro inválido.");
            }

            return(register);
        }
        public void CheckEmail(LoginDto loginUpdate)
        {
            List<Register> registersL = _connection.GetAll();
            var register = registersL.FirstOrDefault(r => r.Email == loginUpdate.Email);

            if (register == null)
            {
                throw new InvalidOperationException("Email incorreto.");
            }

            _registerRepository.Update(registersL, loginUpdate);
        }
    }
}
