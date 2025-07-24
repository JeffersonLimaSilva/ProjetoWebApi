using Newtonsoft.Json;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Model;
using ProjetoWebApi.Services;

namespace ProjetoWebApi.Infrastructure
{
    public class LoginRepository : ILoginRepository
    {
        public object Auth(Admin admin)
        {
            var token = TokenServices.GenerateToken(admin);
            Console.WriteLine(token);
            return token;
        }
    }
}
