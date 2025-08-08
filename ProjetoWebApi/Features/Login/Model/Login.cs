
namespace ProjetoWebApi.Features.Login.Model
{
    public class Login
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Login(Guid id, string email, string password)
        {
            Id = id;
            Email = email;
            Password = password;
        }
    }
}
