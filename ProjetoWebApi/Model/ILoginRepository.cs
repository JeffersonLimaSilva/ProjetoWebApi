using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface ILoginRepository
    {
        object Auth(Admin admin);
    }
}
