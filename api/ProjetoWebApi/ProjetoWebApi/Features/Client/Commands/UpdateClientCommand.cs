using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Client.Commands
{
    public class UpdateClientCommand : ICommand
    {
        public Guid IdAdmin { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string MoreInfor { get; set; }
        public string Interests { get; set; }
        public string Emotions { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
        public string Update { get; set; }
        public UpdateClientCommand(Guid idAdmin, Guid id, string name, string email, int age, string address, string moreInfor, string interests, string emotions, string value, string status, string update)
        {
            IdAdmin = idAdmin;
            Id = id;
            Name = name;
            Email = email;
            Age = age;
            Address = address;
            MoreInfor = moreInfor;
            Interests = interests;
            Emotions = emotions;
            Value = value;
            Status = status;
            Update = update;
        }
    }
}
