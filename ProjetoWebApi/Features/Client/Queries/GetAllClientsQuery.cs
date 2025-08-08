using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetAllClientsQuery : IQuery<List<Model.Client>>
    {
        public Guid Id { get; set; }
        public GetAllClientsQuery(Guid id)
        {
            Id = id;
        }
    }
}
