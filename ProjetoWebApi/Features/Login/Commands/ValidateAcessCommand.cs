using ProjetoWebApi.Common.Interfaces;


namespace ProjetoWebApi.Features.Login.Commands
{
    public class ValidateAcessCommand : ICommand
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public ValidateAcessCommand(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
