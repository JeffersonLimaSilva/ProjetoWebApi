namespace ProjetoWebApi.Model
{
    public interface IContextConnection
    {
        List<Admin> GetAll();
        void SaveAll<TList>(IEnumerable<TList> list);
    }
}
