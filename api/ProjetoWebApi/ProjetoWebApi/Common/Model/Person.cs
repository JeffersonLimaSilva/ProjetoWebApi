namespace ProjetoWebApi.Common.Model
{
    public abstract class Person
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateOnly Date { get; set; }

        public Person(string name, string email)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            Date = DateOnly.FromDateTime(DateTime.Today);
        }
        public Person() { }
    }
}
