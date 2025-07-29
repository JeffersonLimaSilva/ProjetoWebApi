using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Services
{
    public interface IClientServices
    {
        public Task AddClient(Guid IdAdmin, ClientDto clientDto);
        public Task<List<Model.Client>> ClientsList(Guid IdAdmin, PaginationDto paginationDto);

        public Task DeleteClient(Guid Id, Guid id);
        public Task UpdateClient(Guid IdAdmin, Guid IdClient, ClientDto clientDto);
        public Task<Model.Client> GetById(Guid IdAdmin, Guid IdClient);
    }
}
