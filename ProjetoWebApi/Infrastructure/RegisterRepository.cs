using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Infrastructure
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly IContextConnection _connection;
        public RegisterRepository(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(); 
        }
        public void Add(RegisterDto registerDto)
        {
            var registerL = _connection.GetAll();
            registerL.Add(new Register(Guid.NewGuid(), registerDto.Name, registerDto.Email, registerDto.Password));
            _connection.SaveAll(registerL);
        }
        public void Update(List<Register> registerL, LoginDto updateLogin)
        {
            Register existRegister = registerL.FirstOrDefault(r => r.Email == updateLogin.Email);
             existRegister.Password = updateLogin.Password;
            _connection.SaveAll(registerL);
        }
        public void Delete(List<Register> registerL, Register register)
        {
            registerL.Remove(register);
            _connection.SaveAll(registerL);
        }
        public Register GetById(Guid id)
        {
            return _connection.GetAll().FirstOrDefault(r => r.Id == id);
        }

    }
}
