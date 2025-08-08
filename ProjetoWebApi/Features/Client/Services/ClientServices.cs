using ProjetoWebApi.Common.Dispatcher;
using ProjetoWebApi.Common.DTOs;
using ProjetoWebApi.Common.Exceptions;
using ProjetoWebApi.Common.Model;
using ProjetoWebApi.Features.Client.Commands;
using ProjetoWebApi.Features.Client.DTOs;
using ProjetoWebApi.Features.Client.Queries;
using ProjetoWebApi.Features.Client.Validation;

namespace ProjetoWebApi.Features.Client.Services
{
    public class ClientServices : IClientServices
    {
        private readonly Dispatcher _dispatcher;
        private readonly IContextConnection _connection;

        public string fileAdmin = "BaseRegister.txt";

        public ClientServices(Dispatcher dispatcher, IContextConnection connection)
        {
            _dispatcher = dispatcher;
            _connection = connection;
        }

        public async Task AddClient(Guid IdAdmin, ClientDto clientDto)
        {
            try
            {
                List<string> errors = [];
                ClientValidation.NameValidation(errors, clientDto.Name);
                ClientValidation.EmailValidation(errors, clientDto.Email);
                ClientValidation.AgeValidation(errors, clientDto.Age);
                ClientValidation.AddressValidation(errors, clientDto.Address);
                ClientValidation.SmallTextValidation(errors, clientDto.MoreInfor, "Mais Informações");
                ClientValidation.SmallTextValidation(errors, clientDto.Interests, "Interesses");
                ClientValidation.SmallTextValidation(errors, clientDto.Emotions, "Sentimentos");
                ClientValidation.SmallTextValidation(errors, clientDto.Value, "Valores");
                if (errors.Any())
                {
                    throw new ValidationException(errors);
                }
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Email == clientDto.Email && !c.IsDelete);
                if (client != null)
                {
                    throw new InvalidOperationException("Email já está cadastrado!");
                }
                var createClient = new CreateClientCommand
                    (
                        IdAdmin,
                        clientDto.Name,
                        clientDto.Email,
                        int.Parse(clientDto.Age),
                        clientDto.Address,
                        clientDto.MoreInfor,
                        clientDto.Interests,
                        clientDto.Emotions,
                        clientDto.Value,
                        clientDto.Status
                    );
                await _dispatcher.Send(createClient);
            }
            catch {
                throw;
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
                List<string> errors = [];
                ClientValidation.NameValidation(errors, clientDto.Name);
                ClientValidation.EmailValidation(errors, clientDto.Email);
                ClientValidation.AgeValidation(errors, clientDto.Age);
                ClientValidation.AddressValidation(errors, clientDto.Address);
                ClientValidation.SmallTextValidation(errors, clientDto.MoreInfor, "Mais Informações");
                ClientValidation.SmallTextValidation(errors, clientDto.Interests, "Interesses");
                ClientValidation.SmallTextValidation(errors, clientDto.Emotions, "Sentimentos");
                ClientValidation.SmallTextValidation(errors, clientDto.Value, "Valores");
                if (errors.Any())
                {
                    throw new ValidationException(errors);
                }
                var Admins = await _connection.GetAll<Admin.Model.Admin>(fileAdmin);
                var admin = Admins.FirstOrDefault(a => a.Id == IdAdmin);
                var client = admin.Clients.FirstOrDefault(c => c.Id ==IdClient);
                if (client == null)
                {
                    throw new InvalidOperationException("Cliente não existe!");
                }
                List<string> updateList = [];

                IsDifferent(updateList, client.Name, clientDto.Name, "Nome");
                IsDifferent(updateList, client.Email, clientDto.Email, "Email");
                IsDifferent(updateList, client.Age, int.Parse(clientDto.Age), "Idade");
                IsDifferent(updateList, client.Address, clientDto.Address, "Endereço");
                IsDifferent(updateList, client.MoreInfor, clientDto.MoreInfor, "Mais Informações");
                IsDifferent(updateList, client.Interests, clientDto.Interests, "Interesses");
                IsDifferent(updateList, client.Emotions, clientDto.Emotions, "Emoções");
                IsDifferent(updateList, client.Value, clientDto.Value, "Valores");
                IsDifferent(updateList, client.Status, clientDto.Status, "Status");

                var update = string.Join(", ", updateList);

                var updateClient = new UpdateClientCommand(
                    IdAdmin,
                    IdClient,
                    clientDto.Name,
                    clientDto.Email,
                    int.Parse(clientDto.Age),
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
            catch
            {
                throw;
            }
        }
        public async Task<Model.Client> GetById(Guid IdAdmin, Guid IdClient)
        {
            try
            {
                var getById = new GetByIdQuery(IdAdmin, IdClient);
                return await _dispatcher.Query<GetByIdQuery, Model.Client>(getById);
            }
            catch
            {
                throw;
            }
        }
        public void IsDifferent<T>(List<string> update, T clientData, T clientDtoData, string dataName)
        {
            if(!EqualityComparer<T>.Default.Equals(clientData, clientDtoData))
            {
                update.Add(dataName);
            }
        }

        public async Task<ClientsSearchDto> SearchClients(Guid IdAdmin, string Search, PaginationDto paginationDto)
        {
            try
            {
                var searchClients = new SearchClientsQuery(IdAdmin, Search);
                var ClientsSearch = await _dispatcher.Query<SearchClientsQuery, ClientsSearchDto> (searchClients);
                ClientsSearch.ListClients = ClientsSearch.ListClients.Skip(paginationDto.pageSize * paginationDto.pageNumber).Take(paginationDto.pageSize).ToList();
                return ClientsSearch;
            }
            catch
            {
                throw;
            }
        }
    }
}
