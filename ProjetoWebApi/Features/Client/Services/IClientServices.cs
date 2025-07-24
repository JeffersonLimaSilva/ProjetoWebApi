using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Services
{
    public interface IClientServices
    {
        public Task AddClient(Guid IdAdmin, ClientDto clientDto);
        public Task<List<Model.Client>> ClientsList(Guid IdAdmin);
    }
}
