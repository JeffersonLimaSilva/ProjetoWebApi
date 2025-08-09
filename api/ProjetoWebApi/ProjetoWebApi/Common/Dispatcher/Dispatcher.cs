using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Common.Dispatcher
{
    public class Dispatcher
    {
        private readonly IServiceProvider _serviceProvider;

        public Dispatcher(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public async  Task Send<TCommand> (TCommand command, CancellationToken cancellationToken = default)
            where TCommand : ICommand
        {
            try
            {
                var handler = _serviceProvider.GetRequiredService<ICommandHandler<TCommand>>();
                await handler.Handler(command, cancellationToken);
            }
            catch(UnauthorizedAccessException)
            {
                throw;
            }
            catch (Exception ex) 
            {
                throw new InvalidOperationException($"Erro ao atribuir a handler {ex.Message}");
            }
            
        }

        public async Task<TResult> Query<TQuery, TResult>(TQuery query, CancellationToken cancellationToken = default)
            where TQuery : IQuery<TResult> 
        {
            try
            {
                var handler = _serviceProvider.GetRequiredService<IQueryHandler<TQuery, TResult>>();
                return await handler.Handler(query, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erro ao atribuir a handler {ex.Message}");
            }
        }
    }
}
