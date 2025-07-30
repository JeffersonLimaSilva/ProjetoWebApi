using ProjetoWebApi.Features.Admin.DTOs;
using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Features.Admin.Commands;
using ProjetoWebApi.Features.Admin.Queries;
using ProjetoWebApi.Model;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using ProjetoWebApi.Common.AuditLog;
using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Features.Admin.Services
{
    public class AdminServices : IAdminServices
    {
        private readonly Dispatcher _dispatcher;
        private readonly IContextConnection _connection;
        public string fileAdmin = "BaseRegister.txt";

        public AdminServices(Dispatcher dispatcher, IContextConnection connection)
        {
            _dispatcher = dispatcher;
            _connection = connection ?? throw new ArgumentNullException();
        }
        public async Task<bool> CheckEmail(string email)
        {
            List<Model.Admin> AdminsL = await _connection.GetAll<Model.Admin>(fileAdmin);
            var admin = AdminsL.FirstOrDefault(a => a.Email == email);
            if (admin != null)
            {
                return true;
            }
            return false;
        }

        public async Task CheckAdmin(Guid id)
        {
            List<Model.Admin> AdminsL = await _connection.GetAll<Model.Admin>(fileAdmin);
            Model.Admin admin = AdminsL.FirstOrDefault(r => r.Id == id);
            if (AdminsL == null)
            {
                throw new InvalidOperationException("Registro inválido.");
            }
            //_adminRepository.Delete(AdminsL, admin);
        }

        public async Task NewAdmin(AdminDto adminDto)
        {
            try
            {
                if (await CheckEmail(adminDto.Email))
                {
                    throw new InvalidOperationException("Email já está cadastrado.");
                }
                var createAdmin = new CreateAdminCommand(
                    adminDto.Name, 
                    adminDto.Email, 
                    adminDto.Password
                );
                await _dispatcher.Send(createAdmin);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao cadastrar. {ex.Message}");
            }
        }
        public async Task<int> CountTotalRegistration(Guid idAdmin)
        {
            try
            {
                var countTotal = new CountTotalRegistrationQuery(idAdmin);
                return await _dispatcher.Query<CountTotalRegistrationQuery, int>(countTotal);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro na contagem do total de cadastros. {ex.Message}");
            }
        }

        public async Task<int> CountRegistrationMonth(Guid idAdmin)
        {
            try
            {
                var countMonth = new CountRegistrationMonthQuery(idAdmin);
                return await _dispatcher.Query<CountRegistrationMonthQuery, int>(countMonth);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro na contagem de cadastros do mes. {ex.Message}");
            }
        }

        public async Task<int> CountRegistrationInactive(Guid idAdmin)
        {
            try
            {
                var countInactive = new CountRegistrationInactiveQuery(idAdmin);
                return await _dispatcher.Query<CountRegistrationInactiveQuery, int>(countInactive);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro na contagem de cadastros Inativo. {ex.Message}");
            }
        }

        public async Task<List<AuditLogEntry>> GetAllLogsAdmin(Guid idAdmin, PaginationDto paginationDto)
        {
            try
            {
                var logsAdmin = new GetAllLogsAdminQuery(idAdmin);
                var logsList = await _dispatcher.Query<GetAllLogsAdminQuery, List<AuditLogEntry>>(logsAdmin);
                return logsList.Skip(paginationDto.pageNumber * paginationDto.pageSize).Take(paginationDto.pageSize).ToList();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao buscar os Logs. {ex.Message}");
            }
        }

        public async Task<int> CountTotalLogs(Guid idAdmin)
        {
            try
            {
                var countTotal = new CountTotalLogsQuery(idAdmin);
                return await _dispatcher.Query<CountTotalLogsQuery, int>(countTotal);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro na contagem do total de logs. {ex.Message}");
            }
        }
    }
}
