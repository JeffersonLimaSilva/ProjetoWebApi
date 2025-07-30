using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Model
{
    public interface ILoginServices
    {
        public Task<object> CheckLogin(LoginDto loginV);
        public Task<Admin> CheckId(Guid id);
        public Task CheckEmail(LoginDto loginUpdate);
    }
}
