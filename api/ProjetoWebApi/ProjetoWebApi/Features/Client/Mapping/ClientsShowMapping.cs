using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Mapping
{
    public static class ClientsShowMapping
    {
        public static List<ClientShowDto> ToClientShow(List<Model.Client> clients)
        {
            return clients.Select(clients => new ClientShowDto { 
                Id=clients.Id,
                Name=clients.Name,
                Email=clients.Email,
                Status= clients.Status,
                Date=clients.Date
            }).ToList();
        }
    }
}
