using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.DTOs;
using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Model
{
    public interface IAdminRepository
    {
        
        void Add(AdminDto registerDto);
        void Update(List<Admin> AdminsL, LoginDto updateLogin);
        void Delete(List<Admin> AdminsL, Admin admin);
        Admin GetById(Guid id);
    }
}
