using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Model
{
    public interface ILoginRepository
    {
        object Auth(Admin admin);
    }
}
