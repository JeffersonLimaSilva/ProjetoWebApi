using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface ILoginRepository
    {
        object Auth(Register register);
    }
}
