namespace ProjetoWebApi.Common.Interfaces
{
    public interface IQueryHandler<TQuery, TResult> where TQuery : IQuery<TResult>
    {
        Task<TResult> Handler(TQuery query, CancellationToken cancellationToken = default);
    }
}
