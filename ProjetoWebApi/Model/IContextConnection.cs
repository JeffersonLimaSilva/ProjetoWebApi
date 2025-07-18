namespace ProjetoWebApi.Model
{
    public interface IContextConnection
    {
        List<Register> GetAll();
        void SaveAll(List<Register> registersL);
    }
}
