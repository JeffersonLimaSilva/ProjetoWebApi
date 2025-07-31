using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.DTOs;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Queries;
using ProjetoWebApi.Model;
using System.Data.Common;

namespace ProjetoWebApi.Features.Client.Services
{
    public class ClientServices : IClientServices
    {
        private readonly Dispatcher _dispatcher;
        private readonly IContextConnection _connection;

        public string fileAdmin = "BaseRegister.txt";

        public ClientServices(Dispatcher dispatcher, IContextConnection contextConnection)
        {
            _dispatcher = dispatcher;
            _connection = contextConnection;
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
                throw new InvalidOperationException($"Erro ao cadastrar Cliente. {ex.Message}");
            }
        }

        public async Task<List<Model.Client>> ClientsList(Guid IdAdmin, PaginationDto paginationDto)
        {
            
            var getQuery = new GetAllClientsQuery(IdAdmin);
            var clienstList = await _dispatcher.Query<GetAllClientsQuery , List<Model.Client>>(getQuery);
            return clienstList.Skip(paginationDto.pageSize * paginationDto.pageNumber).Take(paginationDto.pageSize).ToList();
        }

        public async Task DeleteClient(Guid IdAdmin, Guid idClient)
        {
            try
            {
                var deleteCommand = new DeleteClientCommand(IdAdmin, idClient);
                await _dispatcher.Send(deleteCommand);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao deletar Cliente. {ex.Message}");
            }
        }

        public async Task UpdateClient(Guid IdAdmin, Guid IdClient, ClientDto clientDto)
        {
            try
            {
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id ==IdClient);

                var update = "";
                if(client.Name != clientDto.Name)
                {
                    update += "Nome";
                }
                if (client.Email != clientDto.Email)
                {
                    update += ", Email";
                }
                if (client.Age != clientDto.Age)
                {
                    update += ", Idade";
                }
                if (client.Address != clientDto.Address)
                {
                    update += ", Endereço";
                }
                if (client.MoreInfor != clientDto.MoreInfor)
                {
                    update += ", Mais Informações";
                }
                if (client.Interests != clientDto.Interests)
                {
                    update += ", Interesses";
                }
                if (client.Emotions != clientDto.Emotions)
                {
                    update += ", Emoções";
                }
                if (client.Value != clientDto.Value)
                {
                    update += ", Valores";
                }
                if (client.Status != clientDto.Status)
                {
                    update += ", Status";
                }

                var updateClient = new UpdateClientCommand(
                    IdAdmin,
                    IdClient,
                    clientDto.Name,
                    clientDto.Email,
                    clientDto.Age,
                    clientDto.Address,
                    clientDto.MoreInfor,
                    clientDto.Interests,
                    clientDto.Emotions,
                    clientDto.Value,
                    clientDto.Status,
                    update
                );
                await _dispatcher.Send(updateClient);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao editar Cliente. {ex.Message}");
            }

        }

        public async Task<Model.Client> GetById(Guid IdAdmin, Guid IdClient)
        {
            try
            {
                var getById = new GetByIdQuery(IdAdmin, IdClient);
                return await _dispatcher.Query<GetByIdQuery, Model.Client>(getById);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao editar Cliente. {ex.Message}");
            }
        }

    }
}
