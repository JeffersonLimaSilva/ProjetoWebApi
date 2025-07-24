using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface IAdminServices
    {
        public bool CheckEmail(string email);
        public void CheckAdmin(Guid id);
        public void NewAdmin(AdminDto adminDto);
    }
}
