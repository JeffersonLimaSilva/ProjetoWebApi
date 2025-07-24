using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.DTOs;


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
