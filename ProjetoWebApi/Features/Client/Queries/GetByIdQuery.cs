using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetByIdQuery : IQuery<Model.Client>
    {
        public GetByIdQuery(Guid idAdmin, Guid idClient)
        {
            IdAdmin = idAdmin;
            IdClient = idClient;
        }
        public Guid IdAdmin { get; set; }
        public Guid IdClient { get; set; }
        
    }
}
