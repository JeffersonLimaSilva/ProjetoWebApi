using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;

namespace ProjetoWebApi.Infrastructure
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IContextConnection _connection;

        public AdminRepository(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException(); 
        }
        public void Add(AdminDto adminDto)
        {
            var AdminsL = _connection.GetAll();
            AdminsL.Add(new Admin(adminDto.Name, adminDto.Email, adminDto.Password));
            _connection.SaveAll(AdminsL);
        }
        public void Update(List<Admin> AdminsL, LoginDto updateLogin)
        {
            Admin existRegister = AdminsL.FirstOrDefault(a => a.Email == updateLogin.Email);
             existRegister.Password = updateLogin.Password;
            _connection.SaveAll(AdminsL);
        }
        public void Delete(List<Admin> AdminsL, Admin admin)
        {
            AdminsL.Remove(admin);
            _connection.SaveAll(AdminsL);
        }
        public Admin GetById(Guid id)
        {
            return _connection.GetAll().FirstOrDefault(a => a.Id == id);
        }

    }
}
