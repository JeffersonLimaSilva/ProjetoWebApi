using ProjetoWebApi.Features.Client.Model;

namespace ProjetoWebApi.Model
{
    public class Admin : Person
    {
        
        public string Password { get; set; }
        public bool Theme { get; set; } = false;

        public List<Client> Clients { get; set; } = new List<Client>();
        public Admin() { }
        public Admin( string name, string email, string password)
            :base(name, email)
        {
            Password = password;
        }

        public void AddClient(Client client)
        {
            Clients.Add(client);
        }

    }
}
