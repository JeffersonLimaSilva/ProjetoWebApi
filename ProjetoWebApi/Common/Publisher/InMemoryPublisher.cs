using Microsoft.Extensions.DependencyInjection;
using ProjetoWebApi.Common.Interfaces;

namespace ProjetoWebApi.Common.Publisher
{
    public class InMemoryPublisher : IPublisher
    {
        private readonly IServiceProvider _serviceProvider;

        public InMemoryPublisher(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task Publish<TEvent>(TEvent @event, CancellationToken cancellationToken = default) where TEvent : IDomainEvent
        {
            try
            {
                var handlers = _serviceProvider.GetServices<IDomainEventHandler<TEvent>>();
                var tasks = handlers.Select(handler => handler.Handler(@event, cancellationToken)).ToList();
                await Task.WhenAll(tasks);
            }
            catch
            {
                throw new InvalidOperationException("Erro ao atribuir a handler");
            }
        }
    }
}
