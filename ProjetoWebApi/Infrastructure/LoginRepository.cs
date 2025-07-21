using Newtonsoft.Json;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;

namespace ProjetoWebApi.Infrastructure
{
    public class LoginRepository : ILoginRepository
    {
        public object Auth(Register register)
        {
            var token = TokenServices.GenerateToken(register);
            Console.WriteLine(token);
            return token;
        }
    }
}
