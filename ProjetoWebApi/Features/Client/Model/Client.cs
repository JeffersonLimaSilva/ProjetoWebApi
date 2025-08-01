using ProjetoWebApi.Common.Model;

namespace ProjetoWebApi.Features.Client.Model
{
    public class Client : Person
    {
        public int Age { get; set; }
        public string Address { get; set; }
        public string MoreInfor { get; set; }
        public string Interests { get; set; }
        public string Emotions { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }

        public bool IsDelete {  get; set; }

        public Client() { }

        public Client( string name, string email, int age, string address, string moreInfor, string interests, string emotions, string value, string status)
            : base(name, email)
        {
            Age = age;
            Address = address;
            MoreInfor = moreInfor;
            Interests = interests;
            Emotions = emotions;
            Value = value;
            Status = status;
            IsDelete = false;
        }

        public void SoftDelete()
        {
            if (IsDelete)
            {
                throw new InvalidOperationException("Este cliente ja foi deletado.");
            }
            IsDelete = true;
        }
    }
}
