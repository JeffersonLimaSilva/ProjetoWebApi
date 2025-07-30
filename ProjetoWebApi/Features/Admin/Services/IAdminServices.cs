using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.DTOs;

namespace ProjetoWebApi.Features.Admin.Services
{
    public interface IAdminServices
    {
        public Task<bool> CheckEmail(string email);
        public Task CheckAdmin(Guid id);
        public Task NewAdmin(AdminDto adminDto);
        public Task<int> CountTotalRegistration(Guid idAdmin);
        public Task<int> CountRegistrationMonth(Guid idAdmin);
        public Task<int> CountRegistrationInactive(Guid idAdmin);
        public Task<List<AuditLogEntry>> GetAllLogsAdmin(Guid idAdmin, PaginationDto paginationDto);
        public Task<int> CountTotalLogs(Guid idAdmin);
    }
}
