namespace ProjetoWebApi.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public List<string> Errors { get; set; }
        public ValidationException(List<string> errors) 
        {
            Errors = errors ?? throw new ArgumentNullException("Lista de erros vazia.");
        }
    }
}
