using ProjetoWebApi.Features.Admin.Model;
using ProjetoWebApi.Features.Login.DTOs;

namespace ProjetoWebApi.Features.Login.Services
{
    public interface ILoginServices
    {
        public Task<object> ValidateAcess(LoginDto loginDto);
        
    }
}
