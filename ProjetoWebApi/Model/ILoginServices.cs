using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface ILoginServices
    {
        public object CheckLogin(LoginDto loginV);
        public Register CheckId(Guid id);
        public void CheckEmail(LoginDto loginUpdate);
    }
}
