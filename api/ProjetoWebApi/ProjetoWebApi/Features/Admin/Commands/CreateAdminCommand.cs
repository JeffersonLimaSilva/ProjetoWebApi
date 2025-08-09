using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Commands
{
    public class CreateAdminCommand : ICommand
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public CreateAdminCommand( string name, string email, string password)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Email = email ?? throw new ArgumentNullException(nameof(email));
            Password = password ?? throw new ArgumentNullException(nameof(password));
        }
    }
}
