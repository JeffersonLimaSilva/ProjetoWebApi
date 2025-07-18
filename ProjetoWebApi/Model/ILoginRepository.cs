using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface ILoginRepository
    {
        void Auth(Register register);
    }
}
