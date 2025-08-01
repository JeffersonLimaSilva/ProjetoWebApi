
using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class CreateClientCommand : ICommand
    {
        public Guid IdAdmin { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string MoreInfor { get; set; }
        public string Interests { get; set; }
        public string Emotions { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }

        public CreateClientCommand(Guid idAdmin, string name, string email, int age, string address, string moreInfor, string interests, string emotions, string value, string status)
        {
            IdAdmin = idAdmin;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Email = email ?? throw new ArgumentNullException(nameof(email));
            Age = age;
            Address = address ?? throw new ArgumentNullException(nameof(address));
            MoreInfor = moreInfor ?? throw new ArgumentNullException(nameof(moreInfor));
            Interests = interests ?? throw new ArgumentNullException(nameof(interests));
            Emotions = emotions ?? throw new ArgumentNullException(nameof(emotions));
            Value = value ?? throw new ArgumentNullException(nameof(value));
            Status = status ?? throw new ArgumentNullException(nameof(status));
        }
    }
}
