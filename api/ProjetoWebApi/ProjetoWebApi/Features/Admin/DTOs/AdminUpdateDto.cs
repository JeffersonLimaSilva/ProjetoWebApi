namespace ProjetoWebApi.Features.Admin.DTOs
{
    public class AdminUpdateDto
    {
        public AdminUpdateDto(string name, string email, string password, bool theme)
        {
            Name = name;
            Email = email;
            Password = password;
            Theme = theme;
        }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Theme { get; set; }
    }
}
