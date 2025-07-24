using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Queries;

namespace ProjetoWebApi.Features.Client.Services
{
    public class ClientServices : IClientServices
    {
        private readonly Dispatcher _dispatcher;

        public ClientServices(Dispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        public async Task AddClient(Guid IdAdmin, ClientDto clientDto)
        {

            try
            {
                var createClient = new CreateClientCommand
                    (
                        IdAdmin,
                        clientDto.Name,
                        clientDto.Email,
                        clientDto.Age,
                        clientDto.Address,
                        clientDto.MoreInfor,
                        clientDto.Interests,
                        clientDto.Emotions,
                        clientDto.Value,
                        clientDto.Status
                    );
                await _dispatcher.Send(createClient);
            }
            catch (Exception ex) { 
            
                Console.WriteLine($"Erro: {ex}");
            }
        }

        public async Task<List<Model.Client>> ClientsList(Guid IdAdmin)
        {
            
            var getQuery = new GetAllClientsQuery(IdAdmin);
            var clienstList = await _dispatcher.Query<GetAllClientsQuery , List<Model.Client>>(getQuery);
            return clienstList;
        }
    }
}
