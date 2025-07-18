using ProjetoWebApi.DTOs;

namespace ProjetoWebApi.Model
{
    public interface IRegisterRepository
    {
        
        void Add(RegisterDto registerDto);
        void Update(List<Register> registerL, LoginDto updateLogin);
        void Delete(List<Register> registerL, Register register);
        Register GetById(Guid id);
    }
}
