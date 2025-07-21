namespace ProjetoWebApi.Model
{
    public class Register
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Theme { get; set; }
        public Register() { }
        public Register(Guid id, string name, string email, string password, bool theme)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            Theme = theme;
        }

    }
}
