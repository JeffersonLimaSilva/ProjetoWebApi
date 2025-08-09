using ProjetoWebApi.Features.Client.DTOs;

namespace ProjetoWebApi.Features.Client.Validation
{
    public interface IClientValidation
    {
        public void Validation(ClientDto clientDto);
        public void ValidationSmallText(List<string> errors, string text, string dataName);
    }
}
