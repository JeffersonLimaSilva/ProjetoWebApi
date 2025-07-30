using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Model
{
    public interface IContextConnection
    {
        public Task<List<TList>> GetAll<TList>(string file);
        Task SaveAll<TList>(IEnumerable<TList> list, string file);
    }
}
