using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.DTOs;
using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Model;
using System.Threading.Tasks;

namespace ProjetoWebApi.Infrastructure
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";

        public AdminRepository(IContextConnection connection)
        {
            _connection = connection ?? throw new ArgumentNullException();
        }
        public async Task Add(AdminDto adminDto)
        {
            var AdminsL = await _connection.GetAll<Admin>(fileAdmin);
            AdminsL.Add(new Admin(adminDto.Name, adminDto.Email, adminDto.Password));
            await _connection.SaveAll(AdminsL, fileAdmin);
        }
        public void Update(List<Admin> AdminsL, LoginDto updateLogin)
        {
            Admin existRegister = AdminsL.FirstOrDefault(a => a.Email == updateLogin.Email);
            existRegister.Password = updateLogin.Password;
            _connection.SaveAll(AdminsL, fileAdmin);
        }
        public void Delete(List<Admin> AdminsL, Admin admin)
        {
            AdminsL.Remove(admin);
            _connection.SaveAll(AdminsL, fileAdmin);
        }
        

    }
}
