using ProjetoWebApi.DTOs;

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
