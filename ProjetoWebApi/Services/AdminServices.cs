using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;
using System.Collections.Generic;
using System.Data.Common;

namespace ProjetoWebApi.Services
{
    public class AdminServices : IAdminServices
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IContextConnection _connection;
        private readonly string path = "C:/Users/JeffersonLimaSilva/OneDrive/Documentos/ProjetoWebApi/ProjetoWebApi/FileBase/BaseRegister.txt";

        public AdminServices(IAdminRepository adminRepository, IContextConnection connection)
        {
            _adminRepository = adminRepository ?? throw new ArgumentNullException();
            _connection = connection ?? throw new ArgumentNullException();
        }
        public bool CheckEmail(string email)
        {
            List<Admin> AdminsL = _connection.GetAll();
            var admin = AdminsL.FirstOrDefault(a => a.Email == email);
            if (admin != null)
            {
                return true;
            }
            return false;
        }

        public void CheckAdmin(Guid id)
        {
            List<Admin> AdminsL = _connection.GetAll();
            Admin admin = AdminsL.FirstOrDefault(r => r.Id == id);
            if (AdminsL == null)
            {
                throw new InvalidOperationException("Registro inválido.");
            }
            _adminRepository.Delete(AdminsL, admin);
        }

        public void NewAdmin(AdminDto adminDto)
        {
            

            if (CheckEmail(adminDto.Email))
            {
                throw new InvalidOperationException("Email já está cadastrado.");
            }
            _adminRepository.Add(adminDto);
        }
    }
}
