namespace ProjetoWebApi.Model
{
    public abstract class Person
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public Person(string name, string email)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
        }

        public Person() { }
    }
}
