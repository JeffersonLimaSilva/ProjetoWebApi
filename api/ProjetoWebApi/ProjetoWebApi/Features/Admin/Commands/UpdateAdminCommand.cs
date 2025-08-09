using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Admin.Commands
{
    public class UpdateAdminCommand : ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Theme { get; set; }

        public UpdateAdminCommand(Guid id, string name, string email, string password, bool theme)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            Theme = theme;
        }

    }
}
