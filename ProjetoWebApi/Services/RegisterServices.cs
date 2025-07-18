using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;
using System.Collections.Generic;
using System.Data.Common;

namespace ProjetoWebApi.Services
{
    public class RegisterServices : IRegisterServices
    {
        private readonly IRegisterRepository _registerRepository;
        private readonly IContextConnection _connection;

        public RegisterServices(IRegisterRepository registerRepository, IContextConnection connection)
        {
            _registerRepository = registerRepository ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
        }
        public bool CheckEmail(string email)
        {
            List<Register> registerL = _connection.GetAll();
            var register = registerL.FirstOrDefault(l => l.Email == email);
            if (register != null)
            {
                return true;
            }
            return false;
        }

        public void CheckRegister(Guid id)
        {
            List<Register> registerL = _connection.GetAll();
            Register register = registerL.FirstOrDefault(r => r.Id == id);
            if (register == null)
            {
                throw new InvalidOperationException("Registro inválido.");
            }
            _registerRepository.Delete(registerL, register);
        }

        public void NewRegister(RegisterDto registerDto)
        {
            if (CheckEmail(registerDto.Email))
            {
                throw new InvalidOperationException("Email já está cadastrado.");
            }
            _registerRepository.Add(registerDto);
        }
    }
}
