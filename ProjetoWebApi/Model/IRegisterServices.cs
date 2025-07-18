using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface IRegisterServices
    {
        public bool CheckEmail(string email);
        public void CheckRegister(Guid id);
        public void NewRegister(RegisterDto registerDto);
    }
}
