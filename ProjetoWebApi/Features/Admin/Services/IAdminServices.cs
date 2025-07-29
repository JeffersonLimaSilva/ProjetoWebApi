using ProjetoWebApi.Features.Admin.DTOs;

namespace ProjetoWebApi.Features.Admin.Services
{
    public interface IAdminServices
    {
        public bool CheckEmail(string email);
        public void CheckAdmin(Guid id);
        public Task NewAdmin(AdminDto adminDto);
        public Task<int> CountTotalRegistration(Guid idAdmin);
        public Task<int> CountRegistrationMonth(Guid idAdmin);
        public Task<int> CountRegistrationInactive(Guid idAdmin);
    }
}
