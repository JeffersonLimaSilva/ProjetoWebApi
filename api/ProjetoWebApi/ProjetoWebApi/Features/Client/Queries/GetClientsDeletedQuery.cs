using ProjetoWebApi.Common.Interfaces;
using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Queries
{
    public class GetClientsDeletedQuery : IQuery<ClientsDeletedDto>
    {
        public Guid Id { get; set; }
        public GetClientsDeletedQuery(Guid id)
        {
            Id = id;
        }
    }
}