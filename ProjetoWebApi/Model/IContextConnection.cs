using ProjetoWebApi.Features.Admin.Model;

namespace ProjetoWebApi.Model
{
    public interface IContextConnection
    {
        public List<Admin> GetAll();
        void SaveAll<TList>(IEnumerable<TList> list);
    }
}
